#!/usr/bin/env python

import xml.etree.ElementTree as ET
import argparse
parser = argparse.ArgumentParser() 

parser.add_argument("--dir", "-d", type=str, required=True)
args = parser.parse_args()


f = open(str(args.dir)+"/SearchList.txt", "r")
searchList = []
for line in f:
	searchList.append(line)
f.close()

l = len(searchList)

IDList = []

for i in range (0, l):
	x = searchList[i]
	x = x.rstrip()
	e = ET.parse(str(x))
	root = e.getroot()
	ID = root[3]
	Number = ID[0].text
	IDList.append(Number)


fh = open(str(args.dir)+"/NCBIDList.txt","w")
for lines in IDList:
	fh.write(str(lines)+"\n")
fh.close()


