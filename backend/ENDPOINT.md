  # ENDPOINTS

* /api
  * /user

    * /register

        request:
        ```
        POST http/localhost:8000/api/user/register
        
        {
            "username": str,
            "password": str,
            "name": str,
            "surename": str,
            "email": "email@example.com"
        }
        ```
        response:
        ```
        {
            "status": "ok"
        }
        ```
    * /me/{user_id}

      request:
      ```
      GET http://localhost/api/user/me/{user_id}
      ```
      
      response:
      ```
      {
          "user_id": int,
          "username": str,
          "name": str,
          "surename": str,
          "email": "email@example.com",
          "phone_number": int,
          "is_verified": bool,
          "created_at": timestamp
      }
      ```
            
    * /update/{user_id}
      
      request:
      ```
      PATCH http://localhost:8000/api/user/update/{user_id}
      
      {
          "username": str | None, 
          "email": "email@example.com" | None,
          "phone_number": int | None
      }
      ```
      response:
      ```
      {
        "username": str | None,
        "email": "email@example.com" | None,
        "phone_number": int | None
      }
      ```

    * /changepass/{user_id}
      
      request:
      ```
      PATCH http://localhost/user/changepass/{user_id}
      
      {
        "old_password": str,
        "new_password": str
      }
      ```

      response:
      ```
      {
        "status": "ok"
      }
      ```

    * /selfexlusion/{user_id}
      
      request:
      ```
      POST http://localhost/api/user/selfexlusion/{user_id}
      
      {
        "startdate": timestamp,
        "enddate": timestamp
      }
      ```

      response:
      ```
      {
        "status: ok"
      }
      ```

  * /auth

    * /login
      
      request:
      ```
      GET http://localhost/auth/login
      
      {
        "email": "email@example.com",
        "password": str
      }
      ```
      
      response:
      ```
      {
        "status": "ok"
        "data": {
          "user_id": int,
          "email": "email@example.com",
          "username": str,
          "role": str
        }
      }
      ```

* /admin

  * /newadmin
      
    request:
    ```
    POST http://localhost/admin/newadmin
      
    {
      "username": str,
      "password": str,
      "name": str,
      "surename": str,
      "email": "email@example.com"
    }
    ```
    
    response:

    ```
    {
      "status": "ok"
    }
    ```

  * /bets

  * /payments

  * /odds

  * /events