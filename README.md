# Gene Expression Data Analysis

## Setup Instructions

### Install Dependencies

1. Install Node.js
    * Download the latest version from [https://nodejs.org/en/](https://nodejs.org/en/)
    * Extract it
    * Link the `node_folder/bin/node` binary to your bin folder

2. Install R dependencies
    * Install R itself
      ```
      sudo apt-get install r-base
      ```
    * Install R packages from R console
      ```
      > source("https://bioconductor.org/biocLite.R")
      > biocLite("GEOquery")
      > install.packages("foreach")
      > install.packages("doParallel")
      ```
3. Install InCHlib (Python 2.7)
   * Install dependencies
     - numpy (tested with version 1.7.1)
     - scipy (tested with version 0.12.0)
     - scikit-learn (tested with version 0.14)
     - fastcluster (tested with version 1.1.8)
     ```
     pip install numpy scipy scikit-learn fastcluster
     ```
   * Install [InCHlib](https://openscreen.cz/software/inchlib/download)
     ```
     wget https://openscreen.cz/software/inchlib/static/inchlib_clust/inchlib_clust-0.1.4.zip
     sudo unzip inchlib_clust-0.1.4.zip
     cd inchlib_clust-0.1.4/
     sudo python setup.py install
     ```

### Run the Local Server

1. Get the repository
   ```
   git clone git@github.gatech.edu:rhaddad7/DVAhub.git
   ```
2. Run the local server. The server will be running on `http://localhost:8080/`
   ```
   cd DVAhub
   node app.js
   ```
