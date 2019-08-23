library ("devtools")
install.packages("factoextra")
install.packages('fpc')
install.packages('stringdist')
install.packages("pastecs")
install.packages("psych")
install.packages("hyperSMURF")
install.packages('Hmisc')
install.packages("dplyr")
install.packages("tables")
install.packages('compareDF')
install.packages("mice")

library('fpc')
library('stringdist')
library('factoextra')
library('reshape2')
library('dplyr')
library('stringr')

#CLUSTERING
#Set active directory for file:
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))

#Load unique options for column to be clustered:
Options <- read.csv("./options/GenusOptions.txt", header = FALSE, sep = c('#'), quote = "")
colnames(Options) <- c("place")
uniqueData <- unique(Options['place'])

#Generate Distance Matrix and cluster data accordingly:
distMatrix <- stringdistmatrix(t(uniqueData),t(uniqueData), method = "lcs")
db <- fpc::dbscan(as.dist(distMatrix), eps = 3, MinPts = 2, scale = FALSE, method = "dist")
print(db)
clusteredData <- as.factor(db$cluster)
print(clusteredData)
fviz_cluster(db,distMatrix, geom = "point")

#Save clustered Data and get new unique options:
write.table(clusteredData, file = "./options/clusteredData.csv", sep = ";", append = FALSE, quote = FALSE)
clusters <- read.csv("./options/clusteredData.csv", header = TRUE, sep = c(';'), quote = "")
Final <- cbind(clusters, uniqueData)
for(i in 1:nrow(uniqueData))
{
  Final[i, 'count'] <- sum(str_count(tempData$Genus, paste('.*',Final[i, 'place'],'.*', sep = ''))==1)
}
write.table(Final, file = "./options/clusteredData.csv", sep = ";", append = FALSE, quote = FALSE)
finalCleanedData <- read.csv("./options/clusteredData.csv", header = TRUE, sep = c(';'), quote = "");
for(i in unique(finalCleanedData$x))
{
  if(i>0)
  {
    check <- data.frame(finalCleanedData[which(finalCleanedData$x==i),'place'])
    finalCleanedData$place[finalCleanedData$x == i] <- check[which(finalCleanedData[which( finalCleanedData$x==i),]$count == max(finalCleanedData[which(finalCleanedData$x==i),]$count)),]
  }
}
write.table(unique(finalCleanedData$place), file = "./options/finalCleanedColumn.csv", sep = ";", append = FALSE, quote = FALSE)







#REPLACEMENT
library('data.table')
ReplacementDataset <- read.csv("DG-AI_FormData.csv", header = TRUE, sep = ";")

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Provinces_LCS-4/ClusteredDataProvince.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Province[ReplacementDataset$Province %in% check$values] <- NA

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
    if(i>0)
    {
      check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
      colnames(check) <- c("values")
      ReplacementDataset$Province[ReplacementDataset$Province %in% check$values] <- check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]
    }
    
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Locations_LCS-4/clusteredDataLocations.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Location[ReplacementDataset$Location %in% check$values] <- NA

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    tryCatch(ReplacementDataset$Location[ReplacementDataset$Location %in% check$values] <- first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]),warning = function(x) print(i))
  }
  
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Asym_Dis/Asym_DisClusteredData.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Location[ReplacementDataset$Location %in% check$values] <- NA

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    ReplacementDataset$Asymptomatic.diseased[ReplacementDataset$Asymptomatic.diseased %in% check$values] <- first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),])
  }
  
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Genus_LCS-3/ClusteredDataGenus.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Genus[ReplacementDataset$Genus %in% check$values] <- NA

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    tryCatch(ReplacementDataset$Genus[ReplacementDataset$Genus %in% check$values] <- first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]),warning = function(x) print(i))
  }
  
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/GrowthTipOptions_LCS-4/ClusteredDataGrowthTip.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Growth.tip[ReplacementDataset$Growth.tip %in% check$values] <- NA

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Growth.tip[grep(paste(check$values, collapse = '|'),ReplacementDataset$Growth.tip)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$Growth.tip <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$Growth.tip)
    }
  }
  
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Needles_Leavs_LCS-4/clusteredDataNeedlesLeaves.csv", header = TRUE, sep = c(';'), quote = "")
clusteredData <- clusteredData[which(clusteredData$x !=23),]
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Needles.Leaves[ReplacementDataset$Needles.Leaves %in% check$values] <- NA

#Remove Regex Special Characters
ReplacementDataset$Growth.tip <- gsub('\\?', '', ReplacementDataset$Growth.tip)
ReplacementDataset$Needles.Leaves <- gsub('\\?', '', ReplacementDataset$Needles.Leaves)
ReplacementDataset[ReplacementDataset == 'S?' | ReplacementDataset == ' S?'] <- NA


#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Growth.tip[grep(paste(check$values, collapse = '|'),ReplacementDataset$Needles.Leaves)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$Needles.Leaves <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$Needles.Leaves)
    }
  }
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/NurseryField/NurseryFieldOptions.txt", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Nursery.Field[ReplacementDataset$Nursery.Field %in% check$values] <- NA

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Nursery.Field[grep(paste(check$values, collapse = '|'),ReplacementDataset$Nursery.Field)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$Nursery.Field <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$Nursery.Field)
    }
  }
  
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Results_LCS-4/clusteredDataResults.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$results[ReplacementDataset$results %in% check$values] <- NA

#Remove Regex Special Characters
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$results <- gsub('\\.', '', ReplacementDataset$results)
ReplacementDataset$results <- gsub('\\[||\\]||\\(||\\)', '', ReplacementDataset$results)

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    print(i)
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$results[grep(paste(check$values, collapse = '|'),ReplacementDataset$results)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$results <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$results)
    }
  }
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/RootCollar_LCS-4/clusteredDataRootCollar.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Root.Collar[ReplacementDataset$Root.Collar %in% check$values] <- NA

#Remove Regex Special Characters
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$Root.Collar <- gsub('\\.', '', ReplacementDataset$Root.Collar)
ReplacementDataset$Root.Collar <- gsub('\\[||\\]||\\(||\\)', '', ReplacementDataset$Root.Collar)

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Growth.tip[grep(paste(check$values, collapse = '|'),ReplacementDataset$Needles.Leaves)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$Root.Collar <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$Root.Collar)
    }
  }
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Roots_LCS-4/clusteredDataRoots.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Roots[ReplacementDataset$Roots %in% check$values] <- NA

#Remove Regex Special Characters
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$Roots <- gsub('\\.', '', ReplacementDataset$Roots)
ReplacementDataset$Roots <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$Roots)

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Growth.tip[grep(paste(check$values, collapse = '|'),ReplacementDataset$Needles.Leaves)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$Roots <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$Roots)
    }
  }
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/SampleType_LCS-4/clusteredDataSampleType.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$type.of.sample[ReplacementDataset$type.of.sample %in% check$values] <- NA

#Remove Regex Special Characters
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$type.of.sample <- gsub('\\.', '', ReplacementDataset$type.of.sample)
ReplacementDataset$type.of.sample <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$type.of.sample)

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Growth.tip[grep(paste(check$values, collapse = '|'),ReplacementDataset$Needles.Leaves)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$type.of.sample <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$type.of.sample)
    }
  }
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Species_LCS-4/clusteredDataSpecies.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$species.clone[ReplacementDataset$species.clone %in% check$values] <- NA

#Remove Regex Special Characters
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$species.clone <- gsub('\\.', '', ReplacementDataset$species.clone)
ReplacementDataset$species.clone <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$species.clone)

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    hello <- data.frame(ReplacementDataset$Growth.tip[grep(paste(check$values, collapse = '|'),ReplacementDataset$Needles.Leaves)])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$species.clone <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$species.clone)
    }
  }
}

#Read data in and remove outliers from data set
clusteredData <-  read.csv("./options/Stem_LCS-4/clusteredDataStem.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Stem[ReplacementDataset$Stem %in% check$values] <- NA

#Remove Regex Special Characters
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$Stem <- gsub('\\.', '', ReplacementDataset$Stem)
ReplacementDataset$Stem <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$Stem)

#Replace data with most common element in cluster. If none is found, use the first element in cluster:
for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    for(j in check[,1])
    {
      ReplacementDataset$Stem <- gsub(j, first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]), ReplacementDataset$Stem)
    }
  }
}
#Save Final Replaced Data
write.table(ReplacementDataset, file = "ReplacedData.csv", sep = ";", append = FALSE, quote = FALSE)







#IMPUTATION
library('mice')
library(data.table)
library('dpl')
library(hyperSMURF)

#Read in original dataset
tempData <- read.csv("DG-AI_FormData.csv", header = TRUE, sep = ";")

#Specify NA values
tempData[tempData==''] <- NA
tempData[tempData=='?'] <- NA
tempData[tempData=='-'] <- NA
tempData[tempData=='N/A'] <- NA
ReplacementDataset[ReplacementDataset==''] <- NA
ReplacementDataset[ReplacementDataset=='?'] <- NA
ReplacementDataset[ReplacementDataset=='-'] <- NA
ReplacementDataset[ReplacementDataset=='N/A'] <- NA
mean(is.na(ReplacementDataset))

#Remove rows with more than 8 missing values
removeInvalidRows <- apply(ReplacementDataset, 1, function(z) sum(is.na(z)))
ReplacementDataset <- ReplacementDataset[removeInvalidRows < 8,]
ReplacementDataset <- droplevels.data.frame(ReplacementDataset)

#Specify each row to be a factor
ReplacementDataset$species.clone <- factor(ReplacementDataset$species.clone)
ReplacementDataset$type.of.sample <- factor(ReplacementDataset$type.of.sample)
ReplacementDataset$Nursery.Field <- factor(ReplacementDataset$Nursery.Field)
ReplacementDataset$Roots <- factor(ReplacementDataset$Roots)
ReplacementDataset$Root.Collar <- factor(ReplacementDataset$Root.Collar)
ReplacementDataset$Stem <- factor(ReplacementDataset$Stem)
ReplacementDataset$Growth.tip <- factor(ReplacementDataset$Growth.tip)
ReplacementDataset$Needles.Leaves <- factor(ReplacementDataset$Needles.Leaves)
ReplacementDataset$results <- factor(ReplacementDataset$results)
tempData$species.clone <- factor(tempData$species.clone)
tempData$type.of.sample <- factor(tempData$type.of.sample)
tempData$Nursery.Field <- factor(tempData$Nursery.Field)
tempData$Roots <- factor(tempData$Roots)
tempData$Root.Collar <- factor(tempData$Root.Collar)
tempData$Stem <- factor(tempData$Stem)
tempData$Growth.tip <- factor(tempData$Growth.tip)
tempData$Needles.Leaves <- factor(tempData$Needles.Leaves)
tempData$Location <- factor(tempData$Location)
tempData$Province <- factor(tempData$Province)
tempData$Asymptomatic.diseased <- factor(tempData$Asymptomatic.diseased)
tempData$Genus <- factor(tempData$Genus)
tempData$results <- factor(tempData$results)finalDataset$results <- factor(finalDataset$results)

#Generate 12 Partitions of equal size in the dataset
partitions <- do.random.partition(nrow(ReplacementDataset), 12)
p <- split(ReplacementDataset, nrow(ReplacementDataset)%%12)
p <- c()

for(i in 1:12)
{
  p <- c(p,  list(ReplacementDataset[rownames(ReplacementDataset)%in%partitions[[i]],]))
  dropped <- droplevels(p[[i]])
  p[[i]] <- dropped
}

#Impute each partition
bigStart <- Sys.time()
imputed <- c()
for(i in 1:12)
{
  start <- Sys.time()
  imputed[[i]] <- parlmice(p[[i]], m = 5, maxit = 5, n.core = 2, n.imp.core = 3, method = "pmm")
  end <- Sys.time()
  print(end - start)
}
bigEnd <- Sys.time()
print(bigEnd - bigStart)

#Recombine each partion into the final dataset
complete <- c()
for(i in 1:12)
{
  complete[[i]] <- complete(imputed[[i]])
}
finalDataset <- dplyr::bind_rows(complete)

write.table(finalDataset, file = "FianlCleanedDataset2.csv", sep = ";", append = FALSE, quote = FALSE)

#Sats and Summaries of data at different stages of cleaning:
library('compareDF')
library(psych)
library(data.table)
library(Hmisc)
library(tables)
finalDataset$species.clone <- factor(finalDataset$species.clone)
finalDataset$type.of.sample <- factor(finalDataset$type.of.sample)
finalDataset$Nursery.Field <- factor(finalDataset$Nursery.Field)
finalDataset$Roots <- factor(finalDataset$Roots)
finalDataset$Root.Collar <- factor(finalDataset$Root.Collar)
finalDataset$Stem <- factor(finalDataset$Stem)
finalDataset$Growth.tip <- factor(finalDataset$Growth.tip)
finalDataset$Needles.Leaves <- factor(finalDataset$Needles.Leaves)
finalDataset$Location <- factor(finalDataset$Location)
finalDataset$Province <- factor(finalDataset$Province)
finalDataset$Asymptomatic.diseased <- factor(finalDataset$Asymptomatic.diseased)
finalDataset$Genus <- factor(finalDataset$Genus)

compareDF::compare_df(ReplacementDataset, tempData,c('Location'))
plot(imputed[[11]])
compareDF::compare_df(finalDataset,tempData , c('Province'))
mean(is.na(finalDataset))
plot(fullImputed)

summary(tempData)
summary(ReplacementDataset)
summary(finalDataset)