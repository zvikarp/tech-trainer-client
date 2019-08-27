import React, { useEffect, useState } from "react";
import { ToastsStore } from "react-toasts";

import messages from "../../consts/messages";
import {
	getSettingsPassing,
	putSettingsPassing
} from "../../sheard/apis/accounts";
import { OButton, OCard, OInput, OLoading } from "../core";
import { resMessageParser } from "../../utils/resParser";

const AllAccounts = () => {
	const [passing, setPassing] = useState(50);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadPassing();
	}, []);

	const loadPassing = async () => {
		try {
			const passing = await getSettingsPassing();
			setPassing(passing);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_LOADING_DATA));
		}
	};

	const handleOnSaveChanges = async () => {
		setLoading(true);
		try {
			await putSettingsPassing(passing);
			ToastsStore.info(messages.SUCCESS_SAVING_CHANGES);
		} catch (err) {
			ToastsStore.info(resMessageParser(err, messages.ERROR_SAVING_CHANGES));
		} finally {
			setLoading(false);
		}
	};

	const handleOnPassingChange = e => {
		setPassing(e.target.value);
	};

	const renderForm = () => {
		if (true) {
			return (
				<div>
					<OInput
						label="Passing Points:"
						onChange={handleOnPassingChange}
						value={passing}
						name="name"
						id="passing"
					/>
					<div className="action-section">
						<OButton
							loading={loading}
							onClick={handleOnSaveChanges}
							customStyle="align-horizontally"
							text="SAVE CHANGES"
						/>
					</div>
				</div>
			);
		} else {
			return <OLoading />;
		}
	};

	return (
		<OCard>
			<h2>Settings</h2>
			{renderForm()}
		</OCard>
	);
};

export default AllAccounts;
