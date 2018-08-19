#!/usr/bin/env python
import re
import argparse
parser = argparse.ArgumentParser() 

parser.add_argument("--string", "-s", type=str, required=True)
args = parser.parse_args()

string = str(args.string)

m = re.findall('[A-z]{2}_[0-9]{6,}', string)

for i in range(0, len(m)):
	print m[i]
