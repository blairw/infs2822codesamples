# python3 -m pip install --upgrade pip
# python3 -m pip install --upgrade wheel
# python3 -m pip install --upgrade tensorflow keras
# python3 -m pip install --upgrade pandas numpy
# python3 -m pip list | grep numpy
# ^ which version of numpy is installed?

# Tensorflow models
import tensorflow as tf
import pandas as pd
import numpy as np

# If an error such as "OMP: Error #15: Initializing libiomp5.dylib, but found libiomp5.dylib already initialized." occurs,
# include:
# import os
# os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

import mnist_reader
X_train, y_train = mnist_reader.load_mnist('../temp', kind='train')
X_test, y_test = mnist_reader.load_mnist('../temp', kind='t10k')
X_train, X_test = X_train / 255.0, X_test / 255.0

model = tf.keras.Sequential([
    tf.keras.layers.Flatten(input_shape=(28, 28)),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(10)
])

print(model.summary()) # displaying our built model

model.compile(optimizer='adam',
              loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
              metrics=['accuracy'])

DATASET_GO_UP_TO = 1000
model.fit(X_train[1:DATASET_GO_UP_TO], y_train[1:DATASET_GO_UP_TO],
epochs=5)

y_pred = model.predict(X_test)
df_results = pd.DataFrame({
    "true_value": y_test
})

df_results["is_correct"] = 0
for i, row in df_results.iterrows():
    predicted_value = np.argmax(y_pred[i])
    df_results.at[i, 'predicted_value'] = predicted_value
    if df_results.at[i, 'true_value'] == predicted_value:
        df_results.at[i, 'is_correct'] = 1

df_results.to_csv("results_tfkeras" + "_" + str(DATASET_GO_UP_TO) + ".csv")
correct_count = df_results['is_correct'].sum()
row_count = df_results.shape[0]
percentage_success = correct_count / row_count
print("How many were calculated correctly? " + str(correct_count) + "/" + str(row_count) + " (" + str(percentage_success) + "%)")

# TENSORFLOW (KERAS) RESULTS:
# --------------------------------------------------------------------

# [Mac] Find CPU using Terminal command:
# sysctl -a | grep machdep.cpu.brand_string
# 
# [Windows] Identify CPU by opening start menu,
# searching for 'System Information',
# then reading the row for 'Processor' under 'System Summary'.

# CPU FOR THESE RESULTS WAS:
# `Intel(R) Xeon(R) CPU X5675 @ 3.07GHz`
#
# With dataset [1:10],   ??s,     success rate ????/10000 (0.????%)
# With dataset [1:20],   ??s,     success rate ????/10000 (0.????%)
# With dataset [1:100],  ??s,     success rate ????/10000 (0.????%)
# With dataset [1:200],  ??m ??s, success rate ????/10000 (0.????%)
# With dataset [1:1000], ??m ??s, success rate ????/10000 (0.????%)
# With dataset [1:2000], ??m ??s, success rate ????/10000 (0.????%)