use admin
db.createUser({user: "$OPLOG_USER", pwd: "$OPLOG_PASSWORD", roles: []})
db.runCommand({ createRole: "oplogger", privileges: [{ resource: { db: 'local', collection: 'system.replset'}, actions: ['find']}], roles: [{role: 'read', db: 'local'}] })
db.adminCommand({setFeatureCompatibilityVersion: "3.4"})
