import { useQuery } from "@apollo/client";
import { GET_ORDERS } from "../graphql/queries";
import { useEffect, useState } from "react";

const useOrders = () => {
	const { loading, error, data } = useQuery(GET_ORDERS);
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		if (!data) return;

		const orders: Order[] = data.getOrders.map(({ value }: OrderResponse) => ({
			carrier: value.carrier,
			createdAt: value.createdAt,
			trackingId: value.trackingId,
			shippingCost: value.shippingCost,
			Address: value.Address,
			City: value.City,
			Lng: value.Lng,
			Lat: value.Lat,
			trackingItems: value.trackingItems
		}));
		setOrders(orders);
	}, [data]);

	return { loading, error, orders };
};

export default useOrders;
