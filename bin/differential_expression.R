#!/usr/bin/env Rscript

args <- commandArgs(TRUE)
if (length(args) != 3) {
  stop("Usage: ./differential_expression.R accession/filename input_type (acc or file) group_string
       Input file has to be in GSE Series Matrix format");
}

library(GEOquery)
library(foreach)
library(doParallel)

if (args[2] == "acc") {
  gse = getGEO(args[1], GSEMatrix = TRUE, AnnotGPL = TRUE)
  gse = gse[[1]]
} else if (args[2] == "file") {
  gse = getGEO(filename = args[1],
              GSEMatrix = TRUE, AnnotGPL = TRUE)
} else {
  write("ERROR: Input type has to be either \"acc\" or \"file\"", stderr())
  quit(status = 1)
}

labels = fData(gse)
genes = exprs(gse)

# Parse out grouping information
groupString = args[3]
groupMapping = strsplit(groupString, ",")[[1]]
selectedColumns = c()
type = c()
for (i in 1:length(groupMapping)) {
  selectedColumns = c(selectedColumns, strsplit(groupMapping[i], ":")[[1]][1])
  type = c(type, strsplit(groupMapping[i], ":")[[1]][2])
}

# Define groups and drop unused columns
genes = subset(genes, select = selectedColumns)
type = as.factor(type)

# Determine which indeces contain missing values
missing = FALSE
nullIndeces = c()
for (i in 1:nrow(genes)) {
  if (any(is.na(genes[i,]))) {
    nullIndeces = c(nullIndeces, i)
    missing = TRUE
  }
}

# Remove label matrices and missing values
a = c(1,2)
if (missing) {
  genes = genes[-nullIndeces,]
  labels = labels[-nullIndeces,]
}

# Setup R copies for parallel processing
cores = detectCores()
if (is.na(cores)) {
  cores = 8
}
cl = makeCluster(cores)
# Register variables for parrallel processing
clusterExport(cl, "genes")
clusterExport(cl, "type")
# Connect parallel backend to foreach package
registerDoParallel(cl)

# Run Anova in parallel mode
pvalueslist = foreach(i = 1:nrow(genes)) %dopar%  {
  summary(aov(genes[i,] ~ type))[[1]]$`Pr(>F)`[[1]]
}

# Shut down parallel workers
stopCluster(cl)

# Adjust p-values for multiple comparisons
adjusted = p.adjust(pvalueslist, method = "fdr")

# Prepare output
output = data.frame(as.character(labels$ID),
                    as.character(labels$`Gene symbol`),
                    as.character(labels$`GenBank Accession`),
                    adjusted,
                    genes)
# Print Header
cat("Probe ID", "Gene Symbol", "GenBank Accession", "Adjusted p-value", selectedColumns, sep = ",")
cat("\n")
order = output[order(output$adjusted),]
write.table(order, file="", quote=FALSE, col.names=FALSE, row.names=FALSE, sep = ",")
