#!/usr/bin/env python
import inchlib_clust
import random
import string
import getopt
import sys

opts, args = getopt.getopt(sys.argv[1:], "p:n:i:")

p = False
num = False
pval = False
infile = None

for o, a in opts:
	if o in ("-n"):
		num = a
	elif o in ("-p"):
		pval = a
		p = True
	else:
		infile = a

wp = open(infile+'.out', 'w')
with open(infile, 'r') as fp:
	header = fp.readline().strip().split(',')
	wp.write(','.join([header[1]]+header[4:])+'\n')
	if p==True:
		for line in fp:
			l = line.strip().split(',')
			if (l[3] == "NA"):
				continue
			if float(l[3]) <= float(pval):
				wp.write(','.join([l[1]+'\t('+l[2]+')']+l[4:])+'\n')

	else:
		for i in range(int(num)):
			l = fp.readline().strip().split(',')
			wp.write(','.join([l[1]+'\t('+l[2]+')']+l[4:])+'\n')

wp.close()

clust = inchlib_clust.Cluster()

clust.read_csv(filename=infile+".out", delimiter=",", header=True, datatype="numeric/str")

clust.cluster_data(row_distance="euclidean", row_linkage="complete",
	column_distance="euclidean", column_linkage="complete", axis="both")

dend = inchlib_clust.Dendrogram(clust)

dend.create_cluster_heatmap(write_data=True)

dend.export_cluster_heatmap_as_json(infile+".cluster")