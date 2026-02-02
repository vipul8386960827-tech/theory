const users = [
  { name: "Alice", role: "admin" },
  { name: "Bob", role: "user" },
  { name: "Charlie", role: "admin" },
  { name: "David", role: "user" },
  { name: "Eve", role: "guest" },
];

function groupByProperty(obj) {
  const uniqueRoles = uniqueRoleSet(obj);
  let rolesObject = {};
  uniqueRoles.forEach((key) => (rolesObject[key] = []));

  Object.entries(rolesObject).forEach(([role, value]) => {
    Object.entries(users).forEach(([key, value]) => {
      if (value.role === role) rolesObject[role].push(value);
    });
  });
  return rolesObject;
}

function uniqueRoleSet(obj) {
  const roles = [];
  obj.map((item) => roles.push(item.role));
  return [...new Set(roles)];
}

const result = groupByProperty(users);
console.log(result);


/* need to learn this and implement this 
function groupByProperty(users) {
  const rolesObject = {}
  users.forEach(user => {
    const role = user.role
    if (!rolesObject[role]) rolesObject[role] = []
    rolesObject[role].push(user)
  })
  return rolesObject
}
 */
