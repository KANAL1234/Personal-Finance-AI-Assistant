import chromadb
from sentence_transformers import SentenceTransformer
import uuid

class TransactionCategorizer:
    def __init__(self):
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        # Use persistent client
        self.client = chromadb.PersistentClient(path="./chroma_db")
        self.collection = self.client.get_or_create_collection(name="categories")
        self.seed_categories()

    def seed_categories(self):
        if self.collection.count() == 0:
            categories = [
                "Groceries", "Dining Out", "Rent", "Utilities", 
                "Entertainment", "Transportation", "Healthcare", 
                "Shopping", "Income", "Transfer"
            ]
            embeddings = self.model.encode(categories).tolist()
            ids = [str(uuid.uuid4()) for _ in categories]
            self.collection.add(
                documents=categories,
                embeddings=embeddings,
                metadatas=[{"category": c} for c in categories],
                ids=ids
            )
            print(f"Seeded {len(categories)} categories.")

    def categorize(self, description: str):
        embedding = self.model.encode([description]).tolist()
        results = self.collection.query(
            query_embeddings=embedding,
            n_results=1
        )
        
        if results['documents'] and results['documents'][0]:
            best_match = results['metadatas'][0][0]['category']
            distance = results['distances'][0][0]
            # Convert distance to confidence (approximate)
            confidence = max(0, 1 - distance) 
            return {"category": best_match, "confidence": confidence}
        
        return {"category": "Uncategorized", "confidence": 0.0}

# Global instance
categorizer = TransactionCategorizer()
