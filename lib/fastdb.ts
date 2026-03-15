import { graphStore } from "@/state/graphStore";

// Mock FastDB connection interface representing the client sdk
export class FastDBClient {
  private url: string;
  private connected: boolean = false;

  constructor(url: string) {
    this.url = url;
  }

  connect() {
    console.log(`[FastDB] Connecting to ${this.url}...`);
    this.connected = true;
    
    // Simulate connection delay
    setTimeout(() => {
      console.log(`[FastDB] Connected. Subscribed to system:nodes and system:edges streams.`);
      // Start pushing mock data via our store
      graphStore.simulateRealtimeEvents();
    }, 500);
  }

  disconnect() {
    this.connected = false;
    console.log(`[FastDB] Disconnected.`);
    graphStore.stop();
  }
}

export const fastdb = new FastDBClient("wss://api.fastdb.dev/v1/stream");
