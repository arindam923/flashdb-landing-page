import { Database, Activity, Search, Zap, Shield, Network } from "lucide-react";

export const features = [
  {
    id: "core",
    icon: Database,
    title: "Core Database",
  },
  {
    id: "realtime",
    icon: Activity,
    title: "Realtime",
  },
  {
    id: "query",
    icon: Search,
    title: "Query Engine",
  },
  {
    id: "memory",
    icon: Zap,
    title: "In-Memory",
  },
  {
    id: "transactions",
    icon: Shield,
    title: "Transactions",
  },
  {
    id: "sync",
    icon: Network,
    title: "Distributed Sync",
  },
];

export const featureContent = {
  core: {
    code: `import { FastDB } from "fastdb"\n\nconst db = new FastDB()\n\ndb.set("session:abc", { user: "42" })\ndb.get("session:abc")\ndb.delete("session:abc")`,
  },
  realtime: {
    code: `db.subscribe("orders", (order) => {\n  console.log("New order", order)\n})`,
  },
  query: {
    code: `db.query("orders")\n  .where("status", "=", "pending")\n  .limit(10)`,
  },
  memory: {
    code: `db.benchmark({\n  operations: 1_000_000\n})`,
  },
  transactions: {
    code: `db.transaction(async (tx) => {\n  tx.set("wallet:1", 100)\n  tx.set("wallet:2", 200)\n})`,
  },
  sync: {
    code: `db.cluster([\n  "node1.fastdb.local",\n  "node2.fastdb.local"\n])`,
  },
};
