use admin
db.createUser({user: "oplogger", pwd: "password", roles: []})
db.runCommand({ createRole: "oplogger", privileges: [{ resource: { db: 'local', collection: 'system.replset'}, actions: ['find']}], roles: [{role: 'read', db: 'local'}] })
db.adminCommand({setFeatureCompatibilityVersion: "3.4"})
