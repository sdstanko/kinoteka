import React from "react";
import styles from './Spinner.module.scss'


const Spinner = () => {
	return (
		<>
			<div className={styles.ldsDualRing}>
				<div className={styles.ldsDualRingAfter}></div>
			</div>
			
		</>
	);
}
 
export default Spinner;