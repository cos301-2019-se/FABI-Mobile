library ("devtools")
install.packages("factoextra")
install.packages("tensorflow")
install.packages("gpur")
install.packages("micemd")
install.packages('fpc')
install.packages('stringdist')
install_tensorflow(version = "gpu")
install.packages("caret")
install.packages("mltools")
install.packages("pastecs")
install.packages("psych")
install.packages("hyperSMURF")
install.packages('Hmisc')
install.packages("dplyr")
install.packages("tables")

library('fpc')
library('stringdist')
library('factoextra')
library('reshape2')
library('dplyr')
library('stringr')

#CLUSTERING
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
Options <- read.csv("./options/GenusOptions.txt", header = FALSE, sep = c('#'), quote = "")
colnames(Options) <- c("place")
uniqueData <- unique(Options['place'])
distMatrix <- stringdistmatrix(t(uniqueData),t(uniqueData), method = "lcs")
db <- fpc::dbscan(as.dist(distMatrix), eps = 3, MinPts = 2, scale = FALSE, method = "dist")
print(db)
clusteredData <- as.factor(db$cluster)
write.table(clusteredData, file = "./options/clusteredDataProvince.csv", sep = ";", append = FALSE, quote = FALSE)
clusters <- read.csv("./options/clusteredDataProvince.csv", header = TRUE, sep = c(';'), quote = "")
Final <- cbind(clusters, uniqueData)
print(clusteredData)
fviz_cluster(db,distMatrix, geom = "point")
for(i in 1:nrow(uniqueData))
{
  Final[i, 'count'] <- sum(str_count(tempData$Genus, paste('.*',Final[i, 'place'],'.*', sep = ''))==1)
}
write.table(Final, file = "./options/clusteredDataProvince.csv", sep = ";", append = FALSE, quote = FALSE)
finalCleanedData <- read.csv("./options/clusteredDataProvince.csv", header = TRUE, sep = c(';'), quote = "");
for(i in unique(finalCleanedData$x))
{
  if(i>0)
  {
    check <- data.frame(finalCleanedData[which(finalCleanedData$x==i),'place'])
    finalCleanedData$place[finalCleanedData$x == i] <- check[which(finalCleanedData[which( finalCleanedData$x==i),]$count == max(finalCleanedData[which(finalCleanedData$x==i),]$count)),]
  }
}
write.table(unique(finalCleanedData$place), file = "./options/finalCleanedProvinces.csv", sep = ";", append = FALSE, quote = FALSE)








#REPLACEMENT
library('data.table')
ReplacementDataset <- read.csv("DG-AI_FormData.csv", header = TRUE, sep = ";")
ReplacementDataset$Growth.tip <- gsub('\\?', '', ReplacementDataset$Growth.tip)
ReplacementDataset$Needles.Leaves <- gsub('\\?', '', ReplacementDataset$Needles.Leaves)


clusteredData <-  read.csv("./options/Provinces_LCS-4/ClusteredDataProvince.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Province[ReplacementDataset$Province %in% check$values] <- NA


for(i in unique(clusteredData$x))
{
    if(i>0)
    {
      check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
      colnames(check) <- c("values")
      ReplacementDataset$Province[ReplacementDataset$Province %in% check$values] <- check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]
    }
    
}

clusteredData <-  read.csv("./options/Locations_LCS-4/clusteredDataLocations.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Location[ReplacementDataset$Location %in% check$values] <- NA

for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    tryCatch(ReplacementDataset$Location[ReplacementDataset$Location %in% check$values] <- first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]),warning = function(x) print(i))
    
    #checker <- as.character( first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]))
    #checker <- data.frame(ReplacementDataset$Location[ReplacementDataset$Location %in% check$values])
  }
  
}


clusteredData <-  read.csv("./options/Asym_Dis/Asym_DisClusteredData.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Location[ReplacementDataset$Location %in% check$values] <- NA

for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    ReplacementDataset$Asymptomatic.diseased[ReplacementDataset$Asymptomatic.diseased %in% check$values] <- first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),])
  }
  
}

clusteredData <-  read.csv("./options/Genus_LCS-3/ClusteredDataGenus.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Genus[ReplacementDataset$Genus %in% check$values] <- NA

for(i in unique(clusteredData$x))
{
  if(i>0)
  {
    check <- data.frame(clusteredData[which(clusteredData$x==i), 'place'])
    colnames(check) <- c("values")
    tryCatch(ReplacementDataset$Genus[ReplacementDataset$Genus %in% check$values] <- first(check[which(clusteredData[which(clusteredData$x==i),]$count == max(clusteredData[which(clusteredData$x==i),]$count)),]),warning = function(x) print(i))
  }
  
}
uniquef <- data.frame(unique(ReplacementDataset$Genus))
uniquef <- data.frame(unique(tempData$Genus))

clusteredData <-  read.csv("./options/GrowthTipOptions_LCS-4/ClusteredDataGrowthTip.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Growth.tip[ReplacementDataset$Growth.tip %in% check$values] <- NA

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

ReplacementDataset[ReplacementDataset == 'S?' | ReplacementDataset == ' S?'] <- NA
clusteredData <-  read.csv("./options/Needles_Leavs_LCS-4/clusteredDataNeedlesLeaves.csv", header = TRUE, sep = c(';'), quote = "")
clusteredData <- clusteredData[which(clusteredData$x !=23),]
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Needles.Leaves[ReplacementDataset$Needles.Leaves %in% check$values] <- NA

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

clusteredData <-  read.csv("./options/NurseryField/NurseryFieldOptions.txt", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Nursery.Field[ReplacementDataset$Nursery.Field %in% check$values] <- NA

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
uniquef <- data.frame(unique(ReplacementDataset$Needles.Leaves))
uniquef <- data.frame(unique(tempData$Needles.Leaves))

clusteredData <-  read.csv("./options/Results_LCS-4/clusteredDataResults.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$results[ReplacementDataset$results %in% check$values] <- NA
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$results <- gsub('\\.', '', ReplacementDataset$results)
ReplacementDataset$results <- gsub('\\[||\\]||\\(||\\)', '', ReplacementDataset$results)

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
uniquef <- data.frame(unique(ReplacementDataset$results))
uniquef <- data.frame(unique(tempData$results))

clusteredData <-  read.csv("./options/RootCollar_LCS-4/clusteredDataRootCollar.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Root.Collar[ReplacementDataset$Root.Collar %in% check$values] <- NA
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$Root.Collar <- gsub('\\.', '', ReplacementDataset$Root.Collar)
ReplacementDataset$Root.Collar <- gsub('\\[||\\]||\\(||\\)', '', ReplacementDataset$Root.Collar)

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
uniquef <- data.frame(unique(ReplacementDataset$Root.Collar))
uniquef <- data.frame(unique(tempData$Root.Collar))

clusteredData <-  read.csv("./options/Roots_LCS-4/clusteredDataRoots.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Roots[ReplacementDataset$Roots %in% check$values] <- NA
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$Roots <- gsub('\\.', '', ReplacementDataset$Roots)
ReplacementDataset$Roots <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$Roots)

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
uniquef <- data.frame(unique(ReplacementDataset$Roots))
uniquef <- data.frame(unique(tempData$Roots))

clusteredData <-  read.csv("./options/SampleType_LCS-4/clusteredDataSampleType.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$type.of.sample[ReplacementDataset$type.of.sample %in% check$values] <- NA
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$type.of.sample <- gsub('\\.', '', ReplacementDataset$type.of.sample)
ReplacementDataset$type.of.sample <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$type.of.sample)

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
uniquef <- data.frame(unique(ReplacementDataset$type.of.sample))
uniquef <- data.frame(unique(tempData$type.of.sample))

clusteredData <-  read.csv("./options/Species_LCS-4/clusteredDataSpecies.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$species.clone[ReplacementDataset$species.clone %in% check$values] <- NA
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$species.clone <- gsub('\\.', '', ReplacementDataset$species.clone)
ReplacementDataset$species.clone <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$species.clone)

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
uniquef <- data.frame(unique(ReplacementDataset$species.clone))
uniquef <- data.frame(unique(tempData$species.clone))

clusteredData <-  read.csv("./options/Stem_LCS-4/clusteredDataStem.csv", header = TRUE, sep = c(';'), quote = "")
check <- data.frame(clusteredData[which(clusteredData$x==0), 'place'])
colnames(check) <- c("values")
ReplacementDataset$Stem[ReplacementDataset$Stem %in% check$values] <- NA
clusteredData$place <- gsub('\\.','', clusteredData$place)
clusteredData$place <- gsub('\\[||\\]||\\(||\\)||\\?','', clusteredData$place)
clusteredData$count[is.na(clusteredData$count)] <- 1
ReplacementDataset$Stem <- gsub('\\.', '', ReplacementDataset$Stem)
ReplacementDataset$Stem <- gsub('\\[||\\]||\\(||\\)||\\?', '', ReplacementDataset$Stem)

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
uniquef <- data.frame(unique(ReplacementDataset))
uniquef <- data.frame(unique(tempData))


#IMPUTATION
library('mice')
library(data.table)
library(mltools)
customers_1h <- one_hot(as.data.table(tempData))
library('caret')
library('dpl')
library(hyperSMURF)


#One Hot Encodeing and Decoding
dmy <- dummyVars(" ~ Location", data = tempData)

trsf <- predict(dmy, newdata = tempData)
even <- function(x) x%%2 == 0
header <- unlist(strsplit(colnames(trsf), '[.]'))[even(2:ncol(trsf))]
header <- header[-1]
reverse <- data.frame(factor(trsf %*% 1:ncol(trsf), labels = header))

write.table(ReplacementDataset, file = "ReplacedData.csv", sep = ";", append = FALSE, quote = FALSE)

tempData <- read.csv("DG-AI_FormData.csv", header = TRUE, sep = ";")

tempData[tempData==''] <- NA
tempData[tempData=='?'] <- NA
tempData[tempData=='-'] <- NA
tempData[tempData=='N/A'] <- NA

ReplacementDataset[ReplacementDataset==''] <- NA
ReplacementDataset[ReplacementDataset=='?'] <- NA
ReplacementDataset[ReplacementDataset=='-'] <- NA
ReplacementDataset[ReplacementDataset=='N/A'] <- NA
mean(is.na(ReplacementDataset))
removeInvalidRows <- apply(ReplacementDataset, 1, function(z) sum(is.na(z)))
ReplacementDataset <- ReplacementDataset[removeInvalidRows < 8,]
compareDF::compare_df(tempData,ReplacementDataset, c('Location'))
ReplacementDataset <- droplevels.data.frame(ReplacementDataset)
noNA <- na.omit(ReplacementDataset)

ReplacementDataset$species.clone <- factor(ReplacementDataset$species.clone)
ReplacementDataset$type.of.sample <- factor(ReplacementDataset$type.of.sample)
ReplacementDataset$Nursery.Field <- factor(ReplacementDataset$Nursery.Field)
ReplacementDataset$Roots <- factor(ReplacementDataset$Roots)
ReplacementDataset$Root.Collar <- factor(ReplacementDataset$Root.Collar)
ReplacementDataset$Stem <- factor(ReplacementDataset$Stem)
ReplacementDataset$Growth.tip <- factor(ReplacementDataset$Growth.tip)
ReplacementDataset$Needles.Leaves <- factor(ReplacementDataset$Needles.Leaves)
ReplacementDataset$results <- factor(ReplacementDataset$results)

partitions <- do.random.partition(nrow(ReplacementDataset), 12)
p <- split(ReplacementDataset, nrow(ReplacementDataset)%%12)
p <- c()


for(i in 1:12)
{
  p <- c(p,  list(ReplacementDataset[rownames(ReplacementDataset)%in%partitions[[i]],]))
  dropped <- droplevels(p[[i]])
  p[[i]] <- dropped
}

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

complete <- c()
for(i in 1:12)
{
  complete[[i]] <- complete(imputed[[i]])
}
finalDataset <- dplyr::bind_rows(complete)

str(dropped)
start <- Sys.time()
imputed <- parlmice(ReplacementDataset, m=6, method = 'rf', maxit = 25, n.core = 3, n.imp.core = 2)
end <- Sys.time()
print(end - start)

hello$species.clone <- factor(hello$species.clone)
hello$type.of.sample <- factor(hello$type.of.sample)
hello$Nursery.Field <- factor(hello$Nursery.Field)
hello$Roots <- factor(hello$Roots)
hello$Root.Collar <- factor(hello$Root.Collar)
hello$Stem <- factor(hello$Stem)
hello$Growth.tip <- factor(hello$Growth.tip)
hello$Needles.Leaves <- factor(hello$Needles.Leaves)
hello$Location <- factor(hello$Location)
hello$Province <- factor(hello$Province)
hello$Asymptomatic.diseased <- factor(hello$Asymptomatic.diseased)
hello$Genus <- factor(hello$Genus)
hello$results <- factor(hello$results)
mouse <- c(hello)

start <- Sys.time()
imputed2 <- mice(hello, m=5, method = 'pmm', maxit = 5)
end <- Sys.time()
print(end - start)
library(Hmisc)
#Hmisc::aregImpute(formula =  ~tempData$results + tempData$Location + tempData$Province + tempData$Genus + tempData$species.clone +
#                    tempData$type.of.sample + tempData$Asymptomatic.diseased + tempData$Nursery.Field
#                 + tempData$Roots + tempData$Root.Collar + tempData$Stem + tempData$Growth.tip
#                  + tempData$Needles.Leaves, data = tempData)



write.table(newData, file = "DG-AI_FormDataCleaned.csv", sep = ";", append = FALSE, quote = FALSE)
write.table(finalDataset, file = "FianlCleanedDataset2.csv", sep = ";", append = FALSE, quote = FALSE)
hello <-  read.csv("FianlCleanedDataset.csv", header = TRUE, sep = ";")
hello[hello == ''] <- NA



install.packages('compareDF')
library('compareDF')
library(psych)
library(data.table)
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
finalDataset$results <- factor(finalDataset$results)
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
tempData$results <- factor(tempData$results)

compareDF::compare_df(ReplacementDataset, tempData,c('Location'))
plot(imputed[[11]])
compareDF::compare_df(finalDataset,tempData , c('Province'))
mean(is.na(finalDataset))
plot(fullImputed)

summary(tempData)
summary(ReplacementDataset)
summary(finalDataset)

#CODE FOR LUV
install.packages("mice")
library('mice')
setwd(dirname(rstudioapi::getActiveDocumentContext()$path))
ReplacementDataset <- read.csv("ReplacedData.csv", header = TRUE, sep = ";")
ReplacementDataset[ReplacementDataset==''] <- NA
ReplacementDataset[ReplacementDataset=='?'] <- NA
ReplacementDataset[ReplacementDataset=='-'] <- NA
ReplacementDataset[ReplacementDataset=='N/A'] <- NA
ReplacementDataset[ReplacementDataset=='NA'] <- NA
start <- Sys.time()
imputed <- parlmice(ReplacementDataset, m=4, method = 'rf', maxit = 25, n.core = 4, n.imp.core = 1)
end <- Sys.time()
print(end - start)