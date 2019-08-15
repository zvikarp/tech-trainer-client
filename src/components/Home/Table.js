import React from "react";

import { TopThree, Passed, Under } from "./";
 // TODO: not to do this...
const Table = (props) => {
	return (
		<div>
			<TopThree {...props} />
			<Passed {...props} />
			<Under {...props} />
		</div>
	);
}

export default Table;