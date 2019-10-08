import pandas as pd 
import pickle
from sklearn.externals.six import StringIO
from IPython.display import Image
from sklearn.tree import export_graphviz
import pydotplus
from sklearn.model_selection import train_test_split
from sklearn import preprocessing
mlb = preprocessing.MultiLabelBinarizer()

df = pd.read_csv("FC-Data3.csv", sep=';') 
# print(df.head()) 

inputs = df.drop('results', axis='columns') 
target = df['results'] 

inputs = pd.get_dummies(inputs, columns=['Location', 'Province', 'Genus', 'Asymptomatic-diseased', 'Nursery-Field'] )

spclColumns = inputs.apply(lambda x: x["species-clone"].replace(', ', ',').strip().split(","), axis=1)
spcl_array = mlb.fit_transform(spclColumns)
spcl = pd.DataFrame(data=spcl_array, columns=mlb.classes_)
spcl = spcl.add_prefix("species-clone_")
inputs = pd.concat([inputs, spcl], axis=1)
inputs = inputs.drop('species-clone', axis=1)
# print( spcl )

tosColumns = inputs.apply(lambda x: x["type-of-sample"].replace(', ', ',').strip().split(","), axis=1)
tos_array = mlb.fit_transform(tosColumns)
tos = pd.DataFrame(data=tos_array, columns=mlb.classes_)
tos = tos.add_prefix("type-of-sample_")
inputs = pd.concat([inputs, tos], axis=1)
inputs = inputs.drop('type-of-sample', axis=1)
# print( tos )

RootsColumns = inputs.apply(lambda x: x["Roots"].replace(', ', ',').strip().split(","), axis=1)
Roots_array = mlb.fit_transform(RootsColumns)
Roots = pd.DataFrame(data=Roots_array, columns=mlb.classes_)
Roots = Roots.add_prefix("Roots_")
inputs = pd.concat([inputs, Roots], axis=1)
inputs = inputs.drop('Roots', axis=1)
# print( Roots )

RootCColumns = inputs.apply(lambda x: x["Root-Collar"].replace(', ', ',').strip().split(","), axis=1)
RootC_array = mlb.fit_transform(RootCColumns)
RootC = pd.DataFrame(data=RootC_array, columns=mlb.classes_)
RootC = RootC.add_prefix("Root-Collar_")
inputs = pd.concat([inputs, RootC], axis=1)
inputs = inputs.drop('Root-Collar', axis=1)
# print( RootC )

StemColumns = inputs.apply(lambda x: x["Stem"].replace(', ', ',').strip().split(","), axis=1)
Stem_array = mlb.fit_transform(StemColumns)
Stem = pd.DataFrame(data=Stem_array, columns=mlb.classes_)
Stem = Stem.add_prefix("Stem_")
inputs = pd.concat([inputs, Stem], axis=1)
inputs = inputs.drop('Stem', axis=1)
# print( Stem )

gtColumns = inputs.apply(lambda x: x["Growth-tip"].replace(', ', ',').strip().split(","), axis=1)
gt_array = mlb.fit_transform(gtColumns)
gt = pd.DataFrame(data=gt_array, columns=mlb.classes_)
gt = gt.add_prefix("Growth-tip_")
inputs = pd.concat([inputs, gt], axis=1)
inputs = inputs.drop('Growth-tip', axis=1)
# print( gt )

nlColumns = inputs.apply(lambda x: str(x["Needles-Leaves"]).replace(', ', ',').strip().split(","), axis=1)
nl_array = mlb.fit_transform(nlColumns)
nl = pd.DataFrame(data=nl_array, columns=mlb.classes_)
nl = nl.add_prefix("Needles-Leaves_")
inputs = pd.concat([inputs, nl], axis=1)
inputs = inputs.drop('Needles-Leaves', axis=1)
# print( nl )

inputs = inputs.drop('Index', axis=1)
# print( inputs )

# for col in inputs.columns.values:
	# print(col)

from sklearn import tree 

model = tree.DecisionTreeClassifier() 

X_train, X_test, Y_train, Y_test = train_test_split(inputs, target, test_size=0.10, random_state = 100)
model.fit(X_train, Y_train) 
print( "Accuracy1: ", model.score(X_test, Y_test)*100, "%" ) 

#=========================================================================================================================================================================

# filename = "DGPTree.sav"
# pickle.dump(model, open(filename, 'wb'))
# print("Save and reload decision tree")

# loadedModel = pickle.load(open(filename, 'rb'))
# print( "Accuracy2: ", loadedModel.score(X_test, Y_test)*100, "% \n") 

# dot_data = StringIO()

# export_graphviz(model, out_file=dot_data, 
				# filled=True, rounded=True,
				# special_characters=True)

# graph = pydotplus.graph_from_dot_data(dot_data.getvalue())
# Image(graph.create_png())
# graph.write_png('FABI-tree.png')
# graph.write_pdf('FABI-tree.pdf')


