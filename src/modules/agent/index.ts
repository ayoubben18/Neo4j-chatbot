import { ChatOpenAI } from "@langchain/openai";
import { OpenAIEmbeddings } from "@langchain/openai";
import initAgent from "./agent";
import { initGraph } from "../graph";
import { PromptTemplate} from "@langchain/core/prompts";
import {RunnableSequence} from "@langchain/core/runnables";
import {StringOutputParser} from "@langchain/core/output_parsers";
import initGenerateAnswerChain from "@/modules/agent/chains/answer-generation.chain";

// tag::call[]
export async function call(input: string, sessionId: string): Promise<string> {

  const llm = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    // Note: only provide a baseURL when using the GraphAcademy Proxy
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_API_BASE,
    },
  });
  // Get Graph Singleton
  const graph = await initGraph();

  const agent = await initAgent(llm, embeddings, graph);
  const res = await agent.invoke({ input }, { configurable: { sessionId } });

  return res;
}
// end::call[]
