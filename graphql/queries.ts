import { gql } from "@apollo/client";

export const GET_CUSTOMERS = gql`
	query GetCustomers {
		getCustomers {
			value {
				email
				name
			}
			name
		}
	}
`;

export const GET_ORDERS = gql`
	query GetOrders {
		getOrders {
			value {
				trackingItems {
					customer_id
					customer {
						email
						name
					}
					items {
						item_id
						price
						quantity
						name
					}
				}
				Address
				City
				Lng
				Lat
				carrier
				createdAt
				shippingCost
				trackingId
			}
		}
	}
`;
