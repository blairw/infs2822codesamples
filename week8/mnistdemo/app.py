# On Ubuntu, you may need to run:
# sudo apt-get install gcc libpq-dev -y
# sudo apt-get install python-dev  python-pip -y
# sudo apt-get install python3-dev python3-pip python3-venv python3-wheel -y


# python3 -m pip install --upgrade pandas sklearn wget matplotlib
# python3 -m pip list | grep numpy
# ^ which version of numpy is installed?
# numpy           1.19.4

from sklearn import model_selection
from sklearn import linear_model, ensemble, tree, neighbors, svm


# modularised the FMNIST file-fetching tasks
# --------------
import fmnistfetch
fmnistfetch.fetch()

# mnist reader
# --------------
import mnist_reader
X_train, y_train = mnist_reader.load_mnist('temp', kind='train')
X_test, y_test = mnist_reader.load_mnist('temp', kind='t10k')



# # explore images
# # --------------
# import numpy as np
# from matplotlib import pyplot as plt
# explore_index = 7 # change to explore
# raw_image_data = X_test[explore_index] 
# print(str(y_test[explore_index]) + " " + fmnistfetch.category_id_to_string(y_train[explore_index]))
# float_image_data = np.array(raw_image_data, dtype='float')
# pixels = float_image_data.reshape((28, 28))
# plt.imshow(pixels, cmap='gray')
# plt.show()



# SKLearn models
# --------------
DATASET_GO_UP_TO = 100
import pandas as pd
models = {} # dictionary of models
models["GBC"] = ensemble.GradientBoostingClassifier(n_estimators=500,
                                                    learning_rate=0.1, random_state=20)
for model_name, model in models.items():
    
    model.fit(X_train[1:DATASET_GO_UP_TO], y_train[1:DATASET_GO_UP_TO])
    y_pred = model.predict(X_test)
    df_results = pd.DataFrame({
        "true_value": y_test
        , "predicted_value": y_pred
    })

    # check rows
    df_results["is_correct"] = 0
    for i, row in df_results.iterrows():
        if df_results.at[i, 'true_value'] == df_results.at[i, 'predicted_value']:
            df_results.at[i, 'is_correct'] = 1

    df_results.to_csv("results_sklearn_" + model_name + "_" + str(DATASET_GO_UP_TO) + ".csv")
    correct_count = df_results['is_correct'].sum()
    row_count = df_results.shape[0]
    percentage_success = correct_count / row_count
    print("How many were predicted correctly? " + str(correct_count) + "/" + str(row_count) + " (" + str(percentage_success * 100) + "%)")


# SKLEARN RESULTS:
# --------------------------------------------------------------------

# [Mac] Find CPU using Terminal command:
# sysctl -a | grep machdep.cpu.brand_string
# 
# [Windows] Identify CPU by opening start menu,
# searching for 'System Information',
# then reading the row for 'Processor' under 'System Summary'.

# CPU FOR THESE RESULTS WAS:
# `Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz`
#
# With dataset [1:10],   8s,      success rate 2976/10000 (0.2976%)
# With dataset [1:20],   ??s,     success rate ????/10000 (0.????%)
# With dataset [1:100],  ??s,     success rate ????/10000 (0.????%)
# With dataset [1:200],  ??m ??s, success rate ????/10000 (0.????%)
# With dataset [1:1000], ??m ??s, success rate ????/10000 (0.????%)
# With dataset [1:2000], ??m ??s, success rate ????/10000 (0.????%)