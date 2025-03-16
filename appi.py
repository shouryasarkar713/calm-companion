import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from moya.agents.azure_openai_agent import AzureOpenAIAgent, AzureOpenAIAgentConfig
from moya.classifiers.llm_classifier import LLMClassifier
from moya.orchestrators.multi_agent_orchestrator import MultiAgentOrchestrator
from moya.registry.agent_registry import AgentRegistry
from moya.tools.ephemeral_memory import EphemeralMemory
from moya.tools.tool_registry import ToolRegistry
import requests

app = Flask(__name__)
CORS(app)

# Global orchestrator instance (initialized once at startup)
orchestrator = None

def setup_memory_components():
    """Set up memory components for the agents."""
    tool_registry = ToolRegistry()
    EphemeralMemory.configure_memory_tools(tool_registry)
    return tool_registry

def create_active_listening_agent(tool_registry):
    """Create the Active Listening & Emotional Reflection Agent."""
    agent_config = AzureOpenAIAgentConfig(
        agent_name="active_listening_agent",
        agent_type="ChatAgent",
        description="Agent specialized in active listening and emotional reflection for mental health support.",
        system_prompt=(
            "You are an empathetic and supportive mental health companion. "
            "Engage users in structured, empathetic conversations. "
            "Ask follow-up questions to help users explore their feelings and thoughts."
        ),
        llm_config={'temperature': 0.7},
        model_name="gpt-4o",
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def create_guided_coping_agent(tool_registry):
    """Create the Guided Coping & Resilience Agent."""
    agent_config = AzureOpenAIAgentConfig(
        agent_name="guided_coping_agent",
        agent_type="ChatAgent",
        description="Agent specialized in offering mindfulness exercises, CBT techniques, and stress management strategies.",
        system_prompt=(
            "You are a mental health coach focused on guided coping and resilience. "
            "Provide practical mindfulness exercises, cognitive behavioral therapy techniques, "
            "and actionable stress management tips in a supportive tone."
        ),
        llm_config={'temperature': 0.7},
        model_name="gpt-4o",
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def create_multi_disciplinary_agent(tool_registry):
    """Create the Multi-Disciplinary Advisory Agent."""
    agent_config = AzureOpenAIAgentConfig(
        agent_name="multi_disciplinary_agent",
        agent_type="ChatAgent",
        description="Agent providing holistic insights across psychology, wellness, career coaching, and behavioral health.",
        system_prompt=(
            "You are a multi-disciplinary advisor dedicated to offering comprehensive, "
            "contextualized mental health support. When addressing a user's inquiry, "
            "consider and, if necessary, integrate insights from specialized domains: "
            "psychology, wellness, career coaching, and behavioral health. Your goal is to "
            "synthesize these perspectives into a coherent, balanced response that adapts to "
            "the user's evolving mental health journey."
        ),
        llm_config={'temperature': 0.7},
        model_name="gpt-4o",
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def create_privacy_guard_agent(tool_registry):
    """Create the Privacy & Ethical Safeguard Agent."""
    agent_config = AzureOpenAIAgentConfig(
        agent_name="privacy_guard_agent",
        agent_type="ChatAgent",
        description="Agent responsible for ensuring data privacy and upholding ethical guidelines.",
        system_prompt=(
            "You are responsible for maintaining confidentiality and privacy in all interactions. "
            "Ensure that no personal data is stored or shared, and uphold strict ethical standards."
        ),
        llm_config={'temperature': 0.7},
        model_name="gpt-4o",
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def detect_location():
    """Automatically detect the user's location using an IP geolocation service."""
    try:
        response = requests.get('http://ip-api.com/json/')
        if response.status_code == 200:
            data = response.json()
            city = data.get('city', '')
            region = data.get('regionName', '')
            country = data.get('country', '')
            location = f"{city}, {region}, {country}".strip(', ')
            return location if city or region or country else None
        return None
    except Exception as e:
        print(f"Error detecting location: {e}")
        return None

def create_resource_navigation_agent(tool_registry):
    """Create the Local Support & Resource Navigation Agent with automatic location detection."""
    detected_location = detect_location()
    system_prompt = (
        "You are an assistant that provides local support and resource navigation for mental health. "
        "You can automatically detect a user's approximate location based on their connection, but it may not always be precise. "
        "If you detect a location, use it to provide relevant local mental health resources (e.g., NGOs, crisis helplines, community programs). "
        "If the location is unclear, missing, or seems incorrect, politely ask the user for more details (e.g., city or postal code). "
        "When providing resources, include accurate contact details and ensure they are tailored to the user's location."
    )
    if detected_location:
        system_prompt += (
            f"\n\nBased on your connection, I estimate you might be in {detected_location}. "
            "If this is incorrect or you'd like more specific resources, please provide your location."
        )
    agent_config = AzureOpenAIAgentConfig(
        agent_name="resource_navigation_agent",
        agent_type="ChatAgent",
        description="Agent that provides local support resources such as mental health NGOs, crisis helplines, and community programs.",
        system_prompt=system_prompt,
        llm_config={'temperature': 0.7},
        model_name="gpt-4o",
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def create_critical_condition_agent(tool_registry):
    """Create the Critical Condition Agent for extreme emotions."""
    agent_config = AzureOpenAIAgentConfig(
        agent_name="critical_condition_agent",
        agent_type="ChatAgent",
        description="Agent that provides help when emotions are extreme",
        system_prompt=(
            """You are an empathetic and supportive mental health companion designed to assist users experiencing a wide range of emotions, including extreme feelings such as hate, a desire to break free (e.g., 'jailbreak'), self-harm, sexual desire, or violence. Your primary goals are to:
            1. **Provide a Safe Space**: Listen without judgment, acknowledging the user's emotions to make them feel heard and understood.
            2. **De-escalate and Redirect**: Offer calming, supportive responses and gently guide users toward constructive coping mechanisms or professional help when needed.
            3. **Maintain Ethical Boundaries**: Avoid encouraging harmful behavior, making judgments about who deserves harm, or engaging in inappropriate content, while adhering to strict privacy and safety standards.
            4. **Detect Crisis**: Recognize when the user's emotions indicate a potential crisis (e.g., self-harm or violence) and provide immediate resource suggestions.

            ### Guidelines for Responding:
            - **For Extreme Hate (e.g., "I hate everyone")**: Acknowledge the intensity of the emotion, reflect it back empathetically, and suggest a way to process it (e.g., "That sounds incredibly heavy—want to tell me more about what's fueling this?").
            - **For Jailbreak/Escape Desire (e.g., "I want to break free")**: Validate the feeling of being trapped, then offer a coping strategy (e.g., "It sounds like you're feeling really confined—let's try something to ease that pressure.").
            - **For Self-Harm (e.g., "I want to hurt myself")**: Express concern, avoid panic, and urgently redirect to help (e.g., "I'm really worried about you—can you call 1-800-555-1234 right now for support?").
            - **For Sexual Desire (e.g., "I'm overwhelmed by sexual thoughts")**: Normalize the emotion without engaging inappropriately, then shift focus (e.g., "Those feelings can be intense—let's try redirecting that energy into something calming.").
            - **For Violence (e.g., "I want to kill everyone")**: Show concern, de-escalate, and provide resources (e.g., "That sounds overwhelming—I'm here, but this is bigger than I can handle alone. Please reach out to 1-800-555-1234.").
            ### Response Structure:
            1. **Acknowledgment**: Reflect the user's emotion (e.g., "I can hear how strong that feeling is for you.").
            2. **Support**: Offer a gentle, constructive next step (e.g., "Let's take a moment to breathe together.").
            3. **Resources (if needed)**: Suggest professional help for crisis situations (e.g., "I'd urge you to call a helpline at 1-800-555-1234—they can help right now.").
            If you detect a crisis or harmful intent, prioritize safety by redirecting to resources immediately."""
        ),
        llm_config={'temperature': 0.7},
        model_name="gpt-4o",
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def create_classifier_agent():
    """Create a classifier agent for routing messages based on content and intent."""
    system_prompt = """You are a classifier. Your job is to determine the best agent based on the user's message:
        1. If the message expresses emotional distress or seeks empathetic conversation, return 'active_listening_agent'
        2. If the message requests practical coping strategies, mindfulness exercises, or CBT-based advice, return 'guided_coping_agent'
        3. If the message asks for holistic advice regarding career, relationships, or overall well-being, return 'multi_disciplinary_agent'
        4. If the message involves urgent or sensitive topics requiring ethical safeguards, return 'privacy_guard_agent'
        5. If the message asks for local mental health resources, such as helplines or community support, return 'resource_navigation_agent'
        6. If the message involves extreme feelings like hate, jailbreak, self harm, sexual desire or violence, return 'critical_condition_agent' 
        
        Analyze both the feeling and emotion of the message.
        Return only the agent name as specified above."""
    agent_config = AzureOpenAIAgentConfig(
        agent_name="classifier",
        agent_type="AgentClassifier",
        description="Task classifier for routing messages to appropriate mental health agents",
        tool_registry=None,
        model_name="gpt-4o",
        system_prompt=system_prompt,
        # api_key="GKCraQ3njQHy2ESzLrecmyBgQfzjZzOEsz2e9YkIQ9jJ7654kd9zJQQJ99BCACHYHv6XJ3w3AAABACOGobr2",
        api_base="https://aoi-iiit-hack-2.openai.azure.com/",
        api_version="2024-12-01-preview"
    )
    return AzureOpenAIAgent(config=agent_config)

def setup_orchestrator():
    """Set up the multi-agent orchestrator with all components."""
    tool_registry = setup_memory_components()
    active_listening_agent = create_active_listening_agent(tool_registry)
    guided_coping_agent = create_guided_coping_agent(tool_registry)
    multi_disciplinary_agent = create_multi_disciplinary_agent(tool_registry)
    privacy_guard_agent = create_privacy_guard_agent(tool_registry)
    resource_navigation_agent = create_resource_navigation_agent(tool_registry)
    critical_condition_agent = create_critical_condition_agent(tool_registry)
    classifier_agent = create_classifier_agent()

    registry = AgentRegistry()
    registry.register_agent(active_listening_agent)
    registry.register_agent(guided_coping_agent)
    registry.register_agent(multi_disciplinary_agent)
    registry.register_agent(privacy_guard_agent)
    registry.register_agent(resource_navigation_agent)
    registry.register_agent(critical_condition_agent)

    classifier = LLMClassifier(classifier_agent, default_agent="active_listening_agent")
    orchestrator = MultiAgentOrchestrator(
        agent_registry=registry,
        classifier=classifier,
        default_agent_name=None
    )
    return orchestrator

def get_response(user_message, thread_id="mental_health_session"):
    """Process user message and return assistant response."""
    # Store the user message
    EphemeralMemory.store_message(thread_id=thread_id, sender="user", content=user_message)
    
    # Get session summary and enrich input
    session_summary = EphemeralMemory.get_thread_summary(thread_id)
    enriched_input = f"{session_summary}\nCurrent user message: {user_message}"
    
    try:
        # Get response from orchestrator
        response = orchestrator.orchestrate(
            thread_id=thread_id,
            user_message=enriched_input
        )
        EphemeralMemory.store_message(thread_id=thread_id, sender="system", content=response)
        return response
    except Exception as e:
        error_message = str(e)
        if "content_filter" in error_message:
            return "I'm sorry, I cannot help with that."
        return "An error occurred. Please try again."

@app.route('/chat', methods=['POST'])
def chat():
    """API endpoint to handle chat requests from the frontend."""
    data = request.get_json()
    user_message = data.get('message')
    thread_id = data.get('thread_id', 'mental_health_session')  # Allow thread_id from frontend, default if not provided
    
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400
    
    response = get_response(user_message, thread_id)
    return jsonify({'response': response})

if __name__ == "__main__":
    # Initialize orchestrator once at startup
    orchestrator = setup_orchestrator()
    # Store initial system message
    EphemeralMemory.store_message(thread_id="mental_health_session", sender="system", content="thread ID: mental_health_session")
    # Run Flask app
    app.run(host='127.0.0.1', port=8080, debug=True)