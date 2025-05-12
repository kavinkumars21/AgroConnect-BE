/**
 * @typedef {'farmer' | 'consumer' | 'business' | 'admin' | 'delivery' | null} UserRole
 */

/**
 * @typedef {Object} User
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {UserRole} role
 * @property {boolean} isVerified
 * @property {string} [location]
 * @property {string} [phone]
 * @property {Date} createdAt
 */

/**
 * @typedef {Object} Crop
 * @property {string} id
 * @property {string} name
 * @property {number} quantity
 * @property {number} price
 * @property {boolean} isOrganic
 * @property {string} image
 * @property {string} farmerId
 * @property {string} farmerName
 * @property {string} location
 * @property {string} [description]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 * @property {boolean} isVerified
 */

/**
 * @typedef {Object} OrderItem
 * @property {string} cropId
 * @property {string} cropName
 * @property {number} quantity
 * @property {number} price
 * @property {string} farmerId
 */

/**
 * @typedef {Object} Order
 * @property {string} id
 * @property {string} buyerId
 * @property {OrderItem[]} items
 * @property {number} totalPrice
 * @property {'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'} status
 * @property {string} [deliveryAgentId]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

/**
 * @typedef {Object} CartItem
 * @property {Crop} crop
 * @property {number} quantity
 */

/**
 * @typedef {Object} Negotiation
 * @property {string} id
 * @property {string} cropId
 * @property {string} buyerId
 * @property {string} farmerId
 * @property {number} proposedPrice
 * @property {number} proposedQuantity
 * @property {'pending' | 'accepted' | 'rejected' | 'countered'} status
 * @property {string} [message]
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
