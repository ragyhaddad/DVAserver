#!/usr/bin/env bash

# Take list of 10-15 genes from clustering
name=""
work="pwd"


while getopts ":f:d:x:" opt; do
  case ${opt} in
    f )
        name=$OPTARG
        ;;
    d )
        work=$OPTARG
        ;;
    x )
        dep=$OPTARG
        ;;
  esac
done
echo $work
cat $name | xargs -I '{}' wget --directory-prefix=$work "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=gene&term={}&retmax=1"

ls $work/esearch* > $work/SearchList.txt

python $dep/SearchParse.py -d $work

cat $work/NCBIDList.txt | xargs -I '{}' curl http://rest.kegg.jp/conv/genes/ncbi-geneid:{} | awk '{print $2}' > $work/geneList.txt

python $dep/pathwayTracker.py -d $work

rm $work/esearch*

rm $work/geneList.txt

rm $work/NCBI*

rm $work/SearchList.txt

