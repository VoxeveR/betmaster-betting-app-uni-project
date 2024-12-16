import bcrypt

salt = bcrypt.gensalt()

def hash_password(password: str) -> bytes:
    encoded_pass = password.encode('utf-8')

    return bcrypt.hashpw(encoded_pass, salt).decode('utf-8')

def verify_password(password: str, user_password: bytes) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), user_password)