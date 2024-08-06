What to do?
1. Make sure nodejs already install
2. After download and un-zip the project, open command prompt and CD to that folder project
=> cd project_folder

3. RUN => npm install


Running in local desktop
Run => node ./dist/app.js


Running on server
1. Make sure npm module is install and enable
2. Make sure pm2 module is install
If not;  RUN => npm install pm2

3. To check listed running service
RUN => pm2 ls OR pm2 list

4. to start the service
RUN => pm2 start ./dist/app.js => 0

5. Other command
pm2 stop <app_name|namespace|id>
pm2 restart <app_name|namespace|id>
pm2 delete <app_name|namespace|id>

pm2 reload all =>Hot Reload allows to update an application without any downtime