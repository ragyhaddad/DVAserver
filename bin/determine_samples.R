#!/usr/bin/env Rscript

args <- commandArgs(TRUE)
if (length(args) != 2) {
  stop("Usage: ./determine_samples.R accession/filename input_type (acc or file)
       Input file has to be in GSE Series Matrix format");
}

library(GEOquery)

if (args[2] == "acc") {
  gse = getGEO(args[1], GSEMatrix = TRUE, getGPL = FALSE)
  gse = gse[[1]]
} else if (args[2] == "file") {
  gse = getGEO(filename = args[1],
              GSEMatrix = TRUE, getGPL = FALSE)
} else {
  write("ERROR: Input type has to be either \"acc\" or \"file\"", stderr())
  quit(status = 1)
}

columns = pData(gse)[c("geo_accession", "title", "source_name_ch1")]
write.table(columns, sep = "\t", row.names = FALSE, col.names = FALSE, quote = FALSE)
