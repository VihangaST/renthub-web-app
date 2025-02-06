# from flask import Blueprint, jsonify,make_response
# from models.menuAccess import MenuAccess
# from models.menuMaster import MenuMaster
# from models.user import Users
# from models.users import UserRole
# from models.role import RoleMenu
# from models.menu import Menu
# from flask import Blueprint, jsonify, request
# from extensions import db
# from ..authentication.login import validate_token

# menus_bp = Blueprint('menus', _name_)

# @menus_bp.route('/menu', methods=['POST'])
# def get_menus():
#     try:
#         data = request.get_json()
#         # get token by removing Bearer
#         token  = request.headers.get('Authorization')
#         token = token.replace('Bearer ', '')
#         user_id = validate_token(token)
#         # print("user_id:", user_id,type(user_id))
#         if not data :
#             return jsonify({"message": "parameters are required"}), 400
        
#         # print("user id =",user_id)
#         roles = db.session.query(Users.RoleID).filter_by(LoginId=user_id).all()
#         print(roles)
#         role_ids = [role.RoleID for role in roles]

#         if not role_ids:
#             return jsonify({"error": "No roles found for user"}), 404

#         # Fetch all menus for the roles
#         menus = db.session.query(MenuMaster).join(MenuAccess, MenuMaster.MenuID_PK == MenuAccess.MenuID_PK).filter(MenuAccess.RoleID.in_(role_ids)).distinct().all()
#         print('menus',menus)

#         # Hide certain menus based on specific conditions 
#         if(role_ids=='1'):
#             hidden_menu_ids = []  
#             filtered_menus = [menu for menu in menus if menu.MenuID_PK not in hidden_menu_ids]
#         else:
#             hidden_menu_ids = [18,19,4,7,9,20,12,23,24,25,26]  
#             filtered_menus = [menu for menu in menus if menu.MenuID_PK not in hidden_menu_ids]
            
        
        
#         # Separate main menus and submenus
#         main_menus = [menu for menu in filtered_menus if menu.MenuType=='1']
#         submenus = [menu for menu in filtered_menus if menu.MenuType=='2']
#         print('main menus',main_menus)
#         print('sub',submenus)
        
#         # Create a dictionary to map main menu IDs to their submenus
#         submenu_dict = {}
#         for submenu in submenus:
#             if submenu.PMenuValue not in submenu_dict:
#                 submenu_dict[submenu.PMenuValue] = []
#             submenu_dict[submenu.PMenuValue].append({
#                 "MenuID": submenu.MenuID_PK,
#                 "MenuName": submenu.SubMenuTitle,
#                 "ParentMenuID": submenu.PMenuValue,
#                 "MenuURL" : submenu.FileURL,
#             })
        
#         # Build the final menu list with nested submenus
#         menu_list = []
#         for main_menu in main_menus:
#             menu_data = {
#                 "MenuID": main_menu.MenuID_PK,
#                 "MenuName": main_menu.PMenuTitle,
#                 "ParentMenuID": main_menu.PMenuValue,
#                 "MenuURL" : main_menu.FileURL,
#                 # "SVGAttribute" : main_menu.SVGAttribute,
#                 "Submenus": submenu_dict.get(main_menu.MenuID_PK, [])
#             }
#             menu_list.append(menu_data)

#         response = make_response(jsonify(menu_list))
#         response.headers.add('Access-Control-Allow-Origin', '*')  # Replace * with specific origin if needed
#         response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')  # Allowed headers
#         response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')  # Allowed methods
#         print('response data:', response.get_data(as_text=True))
#         # return jsonify({'status': 'OK',"message": "Tariff updated successfully"}), 200
#         print("Roles for user:", role_ids)
#         print("Fetched menus:", [menu.MenuID_PK for menu in menus])
#         print("Main menus:", [menu.MenuID_PK for menu in main_menus])
#         print("Submenus:", [menu.MenuID_PK for menu in submenus])

#         return response
#     except Exception as e:
#         print("Error processing request for user:", e or e.args[0]) 
        
#         return jsonify({'error': "Unexpected Error Occurred" })  





































# # @menus_bp.route('/menu', methods=['POST'])
# # def get_menus_with_userId(user_id):
# #     # print(f"Fetching menus for user_id: {user_id}")
# #     user_id=16
 
# #     try:
# #         # Query to get all role IDs for the user
# #         role_ids = db.session.query(Users.RoleID).filter_by(LoginId=user_id).all()  # Fetch multiple values
# #         role_ids = [role_id[0] for role_id in role_ids]
# #         print(f"Role IDs: {role_ids}")
# #     except Exception as e:
# #         error_msg = f"Error querying roles: {e}"
# #         print(error_msg)
# #         response = {
# #             "status": "NOK",
# #             "msg": error_msg
# #         }
# #         return jsonify(response), 500
 
# #     if not role_ids:
# #         response = {
# #             "status": "NOK",
# #             "msg": "No roles found for user"
# #         }
# #         return jsonify(response), 404
 
# #     try:
# #         # Fetch all menus for the roles
# #         menus_query = db.session.query(MenuMaster).join(MenuAccess, MenuMaster.MenuID_PK == RoleMenu.MenuID_PK).filter(RoleMenu.RoleID.in_(role_ids)).distinct().all()
# #         print(f"Menus query result: {[menu.MenuID_PK for menu in menus_query]}")
 
# #         # Filter by menu type if provided
# #         # if menu_type:
# #         #     menus_query = [menu for menu in menus_query if menu.MenuType == menu_type
# #         #                     or (menu.ParentMenuID is not None and menu.MenuType == menu_type)]
           
 
# #     except Exception as e:
# #         error_msg = f"Error querying menus: {e}"
# #         print(error_msg)
# #         response = {
# #             "status": "NOK",
# #             "msg": error_msg
# #         }
# #         return jsonify(response), 500
 
# #     if not menus_query:
# #         response = {
# #             "status": "NOK",
# #             "msg": "No data found"
# #         }
# #         return jsonify(response), 404
 
# #     # Separate main menus and submenus
# #     main_menus = [menu for menu in menus_query if menu.PMenuValue is None]
# #     print(f"Main menus: {[menu.MenuID_PK for menu in main_menus]}")
# #     submenus = [menu for menu in menus_query if menu.PMenuValue is not None]
# #     print(f"Submenus: {[menu.MenuID_PK for menu in submenus]}")
 
# #     # Create a dictionary to map main menu IDs to their submenus
# #     submenu_dict = {}
# #     for submenu in submenus:
# #         if submenu.PMenuValue not in submenu_dict:
# #             submenu_dict[submenu.PMenuValue] = []
# #         submenu_dict[submenu.PMenuValue].append({
# #             "MenuID": submenu.MenuID_PK,
# #             "MenuName": submenu.SubMenuTitle,
# #             "MenuURL": submenu.FileURL,
# #         })
 
# #     # Build the final menu list with nested submenus
# #     menu_list = []
# #     for main_menu in main_menus:
# #         menu_data = {
# #             "MenuID": main_menu.MenuID_PK,
# #             "MenuName": main_menu.PMenuTitle,
# #             "MenuURL": main_menu.FileURL,
# #         }
# #         if main_menu.MenuID_PK in submenu_dict:
# #             menu_data["submenus"] = submenu_dict[main_menu.MenuID_PK]
# #         menu_list.append(menu_data)
 
# #     response = {
# #         "status": "ok",
# #         "data": menu_list,
# #         "msg": "Screen fetched successfully"
# #     }
 
# #     # Create a response and set CORS headers
# #     final_response = make_response(jsonify(response))
# #     final_response.headers.add('Access-Control-Allow-Origin', '*')  # Replace * with specific origin if needed
# #     final_response.headers.add('Access-Control-Allow-Headers', 'Content-Type, Authorization')  # Allowed headers
# #     final_response.headers.add('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')  # Allowed methods
 
# #     return final_response