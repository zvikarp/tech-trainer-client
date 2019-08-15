import React from "react";

import { TopThree, Passed, Under } from "./";

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