from uagents import Agent, Context, Model
import google.generativeai as genai
 
class TestRequest(Model):
    message: str
 
class Response(Model):
    text: str
 
agent = Agent(
    name="your_agent_name_here",
    seed="your_agent_seed_here",
    port=8005,
    endpoint="http://localhost:8005/submit",
)

# Configuring the API key for Google's generative AI service
genai.configure(api_key='Paste your gemini api key here') #API
    
# Initializing the generative model with a specific model name
model = genai.GenerativeModel( model_name="gemini-1.5-flash")
    
# Starting a new chat session
chat = model.start_chat(history=[])

# Function to handle incoming messages
async def handle_message(message):
   
    while True:
        # Get user input
        user_message = message
        
        # Check if the user wants to quit the conversation
        if user_message.lower() == 'quit':
            return "Exiting chat session."
            
        try :
        # Send the message to the chat session and receive a streamed response
            response = chat.send_message(user_message, stream=True)
        except Exception:
            response = "I don't understand. Please clearify."
        
        # Initialize an empty string to accumulate the response text
        full_response_text = ""
        
        # Accumulate the chunks of text
        try:
            for chunk in response:
                full_response_text += chunk.text
        
        except Exception:
            full_response_text = "Key is corrupted. Please reopen the server"
            
        # Print the accumulated response as a single paragraph
        message = full_response_text
        return message
 
@agent.on_event("startup")
async def startup(ctx: Context):
    ctx.logger.info(f"Starting up {agent.name}")
    ctx.logger.info(f"With address: {agent.address}")
    ctx.logger.info(f"And wallet address: {agent.wallet.address()}")
 
@agent.on_query(model=TestRequest, replies={Response})
async def query_handler(ctx: Context, sender: str, _query: TestRequest):
    ctx.logger.info("Query received")
    ans = await handle_message(_query.message)
    try:
        # do something here
        await ctx.send(sender, Response(text=ans))
    except Exception:
        await ctx.send(sender, Response(text="fail"))
 
if __name__ == "__main__":
    agent.run()
