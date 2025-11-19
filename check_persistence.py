import os

def check_persistence():
    db_exists = os.path.exists("database.db")
    chroma_exists = os.path.exists("chroma_db") and os.path.isdir("chroma_db")
    
    print(f"SQLite DB exists: {db_exists}")
    print(f"ChromaDB persistence exists: {chroma_exists}")

if __name__ == "__main__":
    check_persistence()
