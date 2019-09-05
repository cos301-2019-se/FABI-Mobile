import pandas as pd 
import pickle
from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from sklearn.model_selection import train_test_split
from sklearn import tree
from sklearn import preprocessing
import platform

app = Flask(__name__)
api = Api(app)

#Predictor examples for terminal
# curl -H "Content-Type: application/json" -X POST -d "{\"Location\":\"Harding\", \"Province\":\"gauteng\", \"Genus\":\"Pinus\", \"Species\":\"radiata\", \"SampleType\":\"root\", \"Asym_Dis\":\"A\", \"NurseryField\":\"F\", \"Roots\":\"healthy\", \"Root-Collar\":\"Wilted,abitDry\", \"Stem\":\"Girdled\", \"GrowthTip\":\"Swelling\", \"Needles-Leaves\":\"dead\"}" http://127.0.0.1:5000/predict
# curl -H "Content-Type: application/json" -X POST -d "{\"Location\":\"paddok\", \"Province\":\"gauteng\", \"Genus\":\"eucalyptus\", \"Species\":\"radiata\", \"SampleType\":\"seed\", \"Asym_Dis\":\"D\", \"NurseryField\":\"N\", \"Roots\":\"dead\", \"Root-Collar\":\"Wilted,Dry\", \"Stem\":\"Girdled\", \"GrowthTip\":\"Swelling\", \"Needles-Leaves\":\"alive\"}" http://127.0.0.1:5000/predict
# curl -H "Content-Type: application/json" -X POST -d "{\"Location\":\"Harding\", \"Province\":\"gauteng\", \"Genus\":\"Pinus\", \"Species\":\"radiata\", \"SampleType\":\"tree\", \"Asym_Dis\":\"A\", \"NurseryField\":\"F\", \"Roots\":\"healthy\", \"Root-Collar\":\"Wilted,Dry\", \"Stem\":\"Girdled\", \"GrowthTip\":\"Swelling\", \"Needles-Leaves\":\"dead\"}" https://api-fabi.appspot.com/predict

class Predictor(Resource):
	def post(self):
		formData = request.get_json()
		toGuess = []
		fullFile = pd.read_csv("ColumnsList3.txt", sep="\r\n", header = None )
		
		###### Set all to False #####
		for col in fullFile[0]:
			toGuess.append(0)
		
		###### Encode Location #####
		index = 0
		found = False
		for col in fullFile[0]:
			if col.casefold() == ("Location_"+formData["Location"]).casefold():
				toGuess[index] = 1
				found = True
				break
			if col.casefold() == ("Location_ "+formData["Location"]).casefold():
				toGuess[index] = 1
				found = True
				break
			index = index +1
		if found == False:
			return "Cannot make prediction, I do not have data on that location"
			
		###### Encode Province #####
		index = 0
		found = False
		for col in fullFile[0]:
			if col.casefold() == ("Province_"+formData["Province"]).casefold():
				toGuess[index] = 1
				found = True
				break
			if col.casefold() == ("Province_ "+formData["Province"]).casefold():
				toGuess[index] = 1
				found = True
				break
			index = index +1
		if found == False:
			return "Cannot make prediction, I do not have data on that Province"
		
		###### Encode Genus #####
		index = 0
		found = False
		for col in fullFile[0]:
			if col.casefold() == ("Genus_"+formData["Genus"]).casefold():
				toGuess[index] = 1
				found = True
				break
			if col.casefold() == ("Genus_ "+formData["Genus"]).casefold():
				toGuess[index] = 1
				found = True
				break
			index = index +1
		if found == False:
			return "Cannot make prediction, I do not have data on that Genus"
		
		###### Encode Species #####
		colVals = formData["Species"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("Species-clone_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("Species-clone_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return "Cannot make prediction, I do not have data on that Species"
		
		###### Encode Sample Type #####
		colVals = formData["SampleType"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("type-of-sample_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("type-of-sample_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return "Cannot make prediction, I do not have data on that Sample Type"
		
		###### Encode Asymptomatic-diseased #####
		index = 0
		found = False
		for col in fullFile[0]:
			if col.casefold() == ("Asymptomatic-diseased_"+formData["Asym_Dis"]).casefold():
				toGuess[index] = 1
				found = True
				break
			if col.casefold() == ("Asymptomatic-diseased_ "+formData["Asym_Dis"]).casefold():
				toGuess[index] = 1
				found = True
				break
			index = index +1
		if found == False:
			return "Cannot make prediction, Asymptomatic-diseased field should be either 'A' or 'D' "
		
		###### Encode Nursery-Field #####
		index = 0
		found = False
		for col in fullFile[0]:
			if col.casefold() == ("Nursery-Field_"+formData["NurseryField"]).casefold():
				toGuess[index] = 1
				found = True
				break
			if col.casefold() == ("Nursery-Field_ "+formData["NurseryField"]).casefold():
				toGuess[index] = 1
				found = True
				break
			index = index +1
		if found == False:
			return "Cannot make prediction, Nursery-Field field should be either 'A', 'F' or 'N' "
		
		###### Encode Roots #####
		colVals = formData["Roots"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("Roots_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("Roots_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return "Cannot make prediction, I do not have data on that Root "
		
		###### Encode Root-Collar #####
		colVals = formData["Root-Collar"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("Root-Collar_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("Root-Collar_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return  oneVal
		
		###### Encode Stem #####
		colVals = formData["Stem"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("Stem_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("Stem_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return "Cannot make prediction, I do not have data on that Stem "
		
		###### Encode Growth Tip #####
		colVals = formData["GrowthTip"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("Growth-tip_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("Growth-tip_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return "Cannot make prediction, I do not have data on that Growth Tip "
		
		###### Encode Needles-Leaves #####
		colVals = formData["Needles-Leaves"].split(",")
		for oneVal in colVals:
			index = 0
			found = False
			for col in fullFile[0]:
				if col.casefold() == ("Needles-Leaves_"+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				if col.casefold() == ("Needles-Leaves_ "+oneVal.strip()).casefold():
					toGuess[index] = 1
					found = True
					break
				index = index +1
			if found == False:
				return "Cannot make prediction, I do not have data on those Needles & Leaves "
		
		#Send encoded fields to tree for prediction
		filename = "DGPTree.sav"
		loadedModel = pickle.load(open(filename, 'rb'))
		
		result = loadedModel.predict([toGuess]) 
		# print(result[0])
		
		return result[0]


class dTreeBuilder(Resource):
	def post(self):
		password = request.get_json()
		
		#print(platform.architecture() )
		
		if password["pass"] == "itneedsSizeT" :
			mlb = preprocessing.MultiLabelBinarizer()
			df = pd.read_csv("FC-Data3.csv", sep=';') 

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

			model = tree.DecisionTreeClassifier() 

			X_train, X_test, Y_train, Y_test = train_test_split(inputs, target, test_size=0.10, random_state = 100)
			model.fit(X_train, Y_train) 
			
			filename = "DGPTree.sav"
			pickle.dump(model, open(filename, 'wb'))
			
			return model.score(X_test, Y_test)*100
		
		else: return 'Incorrect password'
		
api.add_resource(Predictor, '/predict')
api.add_resource(dTreeBuilder, '/buildTree')

if __name__ == '__main__':
	app.run(debug=True)

