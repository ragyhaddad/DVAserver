#!/usr/bin/env python
import os
import sys
from cStringIO import StringIO
import subprocess
import argparse
parser = argparse.ArgumentParser() 
counter = 0
parser.add_argument("--dir", "-d", type=str, required=True)
args = parser.parse_args()

f = open(str(args.dir)+"/geneList.txt", "r")
geneList = []
for line in f:
	line = line.rstrip()
	geneList.append(line)
f.close()

pathwayDict = {}
pathwayMaster = []

for gene in geneList:
	pathwayList = []
	proc = subprocess.check_output("curl http://rest.kegg.jp/link/pathway/"+str(gene)+" | awk '{print $2}' | awk -F \":\" '{print $2}'", shell=True)
	pathwayList = proc.splitlines()
	for pathway in pathwayList:
		pathwayMaster.append(pathway)
	pathwayDict[gene] = pathwayList

uniqueSet = set(pathwayMaster)
uniqueList = list(uniqueSet)

pathwayCount = []

for u in uniqueList:
	x = pathwayMaster.count(str(u))
 	pathwayCount.append(x)

if max (pathwayCount) <= 1:
	print "No significant pathways found"
	sys.exit(1)

else:
	locations = sorted(range(len(pathwayCount)), key=lambda i: pathwayCount[i])[-4:]

	searchList = []

	for location in locations:
	 	searchList.append(uniqueList[location])


	for title in searchList:
		counter = counter + 1
		presList = []
		title = title.rstrip()
		if title != '':
			for gene in geneList:
				if title in pathwayDict[gene]:
					presList.append(1)
				else:
					presList.append(0)
			w = open(str(args.dir)+'/'+str(counter)+".html", "w")
			href = '/switch/'+str(counter)
			w.write("<html>\n")
			w.write("<head>\n")
			w.write('<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">\n')
			w.write('<script src="https://rawgit.com/jmvillaveces/biojs-vis-keggviewer/master/build/biojsviskeggviewer.min.js"></script>\n')
			w.write('<link rel="stylesheet" href="https://rawgit.com/jmvillaveces/biojs-vis-keggviewer/master/dependencies/css/bootstrap-slider.css"/>\n')
			w.write('<link rel="stylesheet" href="/stylesheets/style.css"/>\n')
			w.write('</head>\n')
			w.write('<div class="container">')
			w.write('</div>')
			w.write("<body><div id='keggViewer'></div></body>\n")
			w.write('</html>\n')
			w.write('<script>')
			w.write("var expression = {\nupColor:'yellow',\n")
			w.write("genes: "+str(geneList)+",\n")
			w.write("conditions: [\n{\n\tname : 'Genes of Interest',\n\tvalues: "+str(presList)+",\n}]\n};\n")
			w.write("var proxy = function(url){return 'https://cors-anywhere.herokuapp.com/'+url;};\n")
			w.write("biojsviskegg.pathway('"+str(title)+"').proxy(proxy).expression(expression).target(document.getElementById('keggViewer')).init();")
			w.write('</script>')
			w.close()
		else: 
			continue





