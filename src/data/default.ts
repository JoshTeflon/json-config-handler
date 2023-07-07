export const defaultStr = `{
    "karma": {
        "required": true,
        "sequence": 1,
        "continue_on_failure": false
    },
    "whitelist": {
        "required": true,
        "sequence": 2,
        "continue_on_failure": true
    },
    "ecosystem": {
        "required": true,
        "sequence": 3,
        "continue_on_failure": false
    },
    "scoring": {
        "minimum": 50,
        "required": true,
        "sequence": 5,
        "continue_on_failure": false
    },
    "credit_bureau": {
        "provider": "CRC",
        "required": true,
        "sequence": 6,
        "continue_on_failure": false
    },
    "balance": {
        "provider": "mono",
        "required": true,
        "sequence": 7,
        "continue_on_failure": false
    },
    "statement": {
        "provider": "mono",
        "required": true,
        "sequence": 8,
        "continue_on_failure": false
    },
    "income": {
        "provider": "mono",
        "required": false,
        "sequence": 9,
        "continue_on_failure": false
    }
}`