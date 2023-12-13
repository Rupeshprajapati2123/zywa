
# Card Status API using Node Js

This is the project made by Rupesh Prajapati , as a tech assignment for Zywa . The backend 
has two routes :

## 1) /upload
```
  This route parse the CSVs from the local machine and uploads it on the Mongo Cloud.
```
## 2)/get_card_status
```
  This route takes an argument user mobile and search his card location in the 4 CSVs and if it got matched in one of the CSVs it stops searching and show the results.
```

## Appendix

## Why Node
Node.js is a powerful and versatile JavaScript runtime built on the V8 JavaScript engine. Here are some reasons why Node.js might be a suitable choice for your project:

1) JavaScript Everywhere: Node.js allows you to use JavaScript for both server-side and client-side development, providing a consistent language across your entire stack.

2) NPM Ecosystem: Node Package Manager (NPM) is a vast ecosystem of open-source libraries and tools that can be easily integrated into your project, saving development time and effort.
3) Fast Execution: Node.js is known for its fast execution speed, thanks to the V8 JavaScript engine. This makes it suitable for real-time applications and high-performance tasks.

## Deployment

To run this project run
1) Install Node Modules
```bash
    npm install 
```
2) Run the Application
```bash
   nodemon app.js
```

