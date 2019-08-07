import React from "react";

import { TopThree, Passed, Under } from "./";
 // TODO: not to do this...
export default function Table(props) {
	return (
		<div>
			<TopThree {...props} />
			<Passed {...props} />
			<Under {...props} />
		</div>
	);
}
