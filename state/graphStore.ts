export interface GraphNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  activity: number;
  status: "active" | "inactive";
  icon?: string;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
  activity: number;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

type Subscriber = (data: GraphData) => void;

class GraphStore {
  private data: GraphData;
  private subscribers: Set<Subscriber> = new Set();
  private animationFrameId?: number;

  constructor() {
    this.data = {
      nodes: [
        { id: "core", label: "FastDB Cluster", x: 400, y: 400, color: "#FFFFFF", activity: 1, status: "active" },
        { id: "realtime", label: "Realtime", x: 580, y: 220, color: "#3BFF7C", activity: 0.2, status: "active" },
        { id: "memory", label: "In-Memory", x: 260, y: 240, color: "#22D3EE", activity: 0.3, status: "active" },
        { id: "query", label: "Query Engine", x: 240, y: 560, color: "#FF8A00", activity: 0.8, status: "active" },
        { id: "disk", label: "Persistence", x: 560, y: 580, color: "#8B5CF6", activity: 0.4, status: "active" },
        { id: "txns", label: "Transactions", x: 620, y: 400, color: "#FF4DA6", activity: 0.2, status: "active" },
      ],
      edges: [
        { id: "e-realtime", from: "core", to: "realtime", activity: 0.2 },
        { id: "e-memory", from: "core", to: "memory", activity: 0.3 },
        { id: "e-query", from: "core", to: "query", activity: 0.8 },
        { id: "e-disk", from: "core", to: "disk", activity: 0.4 },
        { id: "e-txns", from: "core", to: "txns", activity: 0.2 },
      ]
    };
  }

  subscribe(callback: Subscriber) {
    this.subscribers.add(callback);
    callback(this.data);
    return () => {
      this.subscribers.delete(callback);
    };
  }

  notify() {
    this.subscribers.forEach((sub) => { sub(this.data); });
  }

  // Simulating realtime FastDB websocket incoming events
  simulateRealtimeEvents() {
    let lastTime = performance.now();
    const loop = (time: number) => {
      // update logic every roughly 500ms for visual randomness
      if (time - lastTime > 600) {
        lastTime = time;
        // Map over nodes and randomly modify activity, but mostly keep it smooth
        this.data.nodes = this.data.nodes.map(node => {
          if (node.id === "core") return node; // Core is constant
          const targetActivity = Math.random() > 0.7 ? Math.random() * 0.9 + 0.1 : node.activity * 0.9;
          return { ...node, activity: node.activity + (targetActivity - node.activity) * 0.2 };
        });

        // Sync edge activity with node activity
        this.data.edges = this.data.edges.map(edge => {
          const targetNode = this.data.nodes.find(n => n.id === edge.to);
          return { ...edge, activity: targetNode ? targetNode.activity : edge.activity };
        });

        this.notify();
      }
      this.animationFrameId = requestAnimationFrame(loop);
    };
    this.animationFrameId = requestAnimationFrame(loop);
  }

  stop() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  getData() {
    return this.data;
  }
}

export const graphStore = new GraphStore();
