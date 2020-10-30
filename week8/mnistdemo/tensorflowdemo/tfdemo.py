# python3 -m pip install --upgrade keras tensorflow
# python3 -m pip list | grep numpy
# ^ which version of numpy is installed?

# Tensorflow models
from keras.callbacks import EarlyStopping
from keras.models import Sequential
from keras.layers.core import Dense, Dropout, Flatten, Reshape
from keras.layers.convolutional import Conv2D
from keras.layers.pooling import MaxPooling2D
from keras.optimizers import Adadelta, Adam, RMSprop
from keras.utils import to_categorical

# If an error such as "OMP: Error #15: Initializing libiomp5.dylib, but found libiomp5.dylib already initialized." occurs,
# include:
# import os
# os.environ['KMP_DUPLICATE_LIB_OK'] = 'True'

model = Sequential()
model.add(Reshape((28,28,1), input_shape=(28*28,)))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(10, activation='softmax'))

print(model.summary()) # displaying our built model