from uagents import Agent, Context, Model

import numpy as np
from tensorflow.keras.layers import Input, Dense, Flatten, Conv2D, MaxPooling2D, BatchNormalization, Dropout, LeakyReLU
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.optimizers import Adam
import tensorflow.keras.models 
import os

class TestRequest(Model):
    message: str

class Response(Model):
    text: int
    
agent = Agent(
    name="DeepFake Agent",
    seed="Secret Code for DeepFake",
    port=8010,
    endpoint="http://localhost:8010/submit",
)

# MesoNet

image_dimensions = {'height':256, 'width':256, 'channels':3} #rgb

class Classifier:
    def __init__():
        self.model = 0
    
    def predict(self, x):
        return self.model.predict(x)
    
    def fit(self, x, y):
        return self.model.train_on_batch(x, y)
    
    def get_accuracy(self, x, y):
        return self.model.test_on_batch(x, y)
    
    def load(self, path):
        self.model.load_weights(path)

class Meso4(Classifier):
    def __init__(self, learning_rate = 0.001):
        self.model = self.init_model()
        optimizer = Adam(learning_rate = learning_rate)
        self.model.compile(optimizer = optimizer,
                           loss = 'mean_squared_error',
                           metrics = ['accuracy'])
    
    def init_model(self): 
        x = Input(shape = (image_dimensions['height'],
                           image_dimensions['width'],
                           image_dimensions['channels']))
        
        x1 = Conv2D(8, (3, 3), padding='same', activation = 'relu')(x)
        x1 = BatchNormalization()(x1)
        x1 = MaxPooling2D(pool_size=(2, 2), padding='same')(x1)
        
        x2 = Conv2D(8, (5, 5), padding='same', activation = 'relu')(x1)
        x2 = BatchNormalization()(x2)
        x2 = MaxPooling2D(pool_size=(2, 2), padding='same')(x2)
        
        x3 = Conv2D(16, (5, 5), padding='same', activation = 'relu')(x2)
        x3 = BatchNormalization()(x3)
        x3 = MaxPooling2D(pool_size=(2, 2), padding='same')(x3)
        
        x4 = Conv2D(16, (5, 5), padding='same', activation = 'relu')(x3)
        x4 = BatchNormalization()(x4)
        x4 = MaxPooling2D(pool_size=(4, 4), padding='same')(x4)
        
        y = Flatten()(x4)
        y = Dropout(0.5)(y)
        y = Dense(16)(y)
        y = LeakyReLU(alpha=0.1)(y)
        y = Dropout(0.5)(y)
        y = Dense(1, activation = 'sigmoid')(y)

        return tensorflow.keras.models.Model(inputs = x, outputs = y)
    
meso = Meso4()
meso.load('./ensembler/weights/Meso4_DF.h5')


    
# fetchers model
save_weights_path = './ensembler/weights/fetchers.keras'
model_input_shape = (224, 224) 

img_height, img_width = model_input_shape
batch_size = 32

model = tensorflow.keras.models.Sequential([
    Conv2D(32, (3, 3), activation='relu', input_shape=(img_height, img_width, 3)),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(64, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Conv2D(128, (3, 3), activation='relu'),
    MaxPooling2D(pool_size=(2, 2)),
    Flatten(),
    Dense(512, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# Function to check if an image is a deepfake
def predict_image(image_path):
    image = load_img(image_path, target_size=model_input_shape)
    image_array = img_to_array(image)
    image_array = np.expand_dims(image_array, axis=0)
    image_array /= 255.0 

    model.load_weights('./ensembler/weights/fetchers.keras')
    prediction = model.predict(image_array)
    return prediction

async def handle_image(addrs):

    img_path = 'D:\Desktop/'+addrs

    #meso
    img = load_img(img_path, target_size=(256, 256))
    X = img_to_array(img)
    X = X / 255.0
    X = np.expand_dims(X, axis=0)

    meso_pred = meso.predict(X)[0][0]*100 
    hehe_prediction = (predict_image(img_path) - 0.5) * 100

    ensemble_prediction = (meso_pred + hehe_prediction)/2

    # Make a prediction
    print(f'The image {os.path.basename(img_path)} is a real with a confidence of {ensemble_prediction}')    
    print(f'The image {os.path.basename(img_path)} is deepfake with a confidence of {100 - ensemble_prediction}')

    print(img_path)
    return ensemble_prediction




@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {agent.name}")
    ctx.logger.info(f"With address: {agent.address}")
    ctx.logger.info(f"And wallet address: {agent.wallet.address()}")
    
@agent.on_query(model=TestRequest, replies={Response})
async def query_handler(ctx: Context, sender: str, _query: TestRequest):
    ctx.logger.info("Query Recieved")
    result = await handle_image(_query.message)
    try:
        await ctx.send(sender, Response(text=result))
    except Exception:
        await ctx.send(sender, Response(text="Image can't be loaded properly."))
        
if __name__ == "__main__":
    agent.run()
