library ("devtools")
install.packages("factoextra")
install.packages("tensorflow")
install.packages("gpur")
install.packages("micemd")
install.packages('fpc')
install.packages('stringdist')

library('fpc')
library('stringdist')
library('factoextra')
setwd("C:\\Users\\Aeron\\Desktop\\test\\Cleaning\\Options")
Options <- read.csv("Needles_LeavesOptionsSingular.csv", header = FALSE, sep = ";", quote = "")
uniqueData <- unique(Options)
write.table(uniqueData, file = "Needles_LeavesOptionsUnique.csv", sep = ";", append = FALSE, quote = FALSE)

distMatrix <- stringdistmatrix(t(uniqueData),t(uniqueData), method = "lcs")
db <- fpc::dbscan(as.dist(distMatrix), eps = 4, MinPts = 2, scale = FALSE, method = "dist")
print(db)
clusteredData <- as.factor(db$cluster)
write.table(clusteredData, file = "clusteredData.csv", sep = ";", append = FALSE, quote = FALSE)
print(clusteredData)
fviz_cluster(db,distMatrix, geom = "point")




library("tensorflow")
install_tensorflow(version = "gpu")
library('mice')
library('micemd')
setwd("C:\\Users\\Aeron\\Desktop\\test\\Cleaning")
tempData <- read.csv("DG-AI_FormDataShort.csv", header = TRUE, sep = ";")
tempData[tempData==''] <- NA
tempData[tempData=='?'] <- NA
mean(is.na(tempData))
start <- Sys.time()
imputed <- mice.par(tempData, m = 5, method = "pmm", maxit = 25)
end <- Sys.time()
print(end - start)
plot(imputed, c("type.of.sample"))
newData <- complete(imputed)
write.table(newData, file = "DG-AI_FormDataCleaned.csv", sep = ";", append = FALSE, quote = FALSE)
