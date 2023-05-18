import './App.css';
import {useEffect, useState} from 'react';

function App() {

	const [firstActivity, setFirstActivity] = useState({});
  const [fetchedObjects, setFetchedObjects] = useState([]);
  const [expanded, setExpanded] = useState({});

	useEffect(() => {
		fetch(`https://www.boredapi.com/api/activity`)
			.then((res) => res.json())
			.then((activityObj) => setFirstActivity(activityObj));
      
	}, []);

  const activityArray = [];
  activityArray.push(firstActivity);

  async function handleGenerate() {
    try {
      const response = await fetch('https://www.boredapi.com/api/activity');
      const activityObj = await response.json();
  
      // Create a new array by concatenating the existing fetchedObjects array with the new fetched object
      const updatedArray = [...fetchedObjects, activityObj];
  
      // Update the state with the updated array
      setFetchedObjects(updatedArray);
    } catch (error) {
      console.log('Error fetching object:', error);
    }
  }

	function handleExpand(key) {
    setExpanded(prevState => ({
      ...prevState,
      [key]: !prevState[key] // Toggles the value for the specific key
    }));
	}

	const listItems = activityArray.map((activity) => (
    <div key={activity.key}>
      <li>{activity.activity}</li>	
      <button onClick={() => handleExpand(activity.key)}>
        {expanded[activity.key] ? 'Collapse' : 'Expand'}
      </button>
      {expanded[activity.key] &&  
        <>
          <ul>
            <li>type: {activity.type}</li>
            <li>participants: {activity.participants}</li>
            <li>price: {activity.price}</li>
            <li>link: {activity.link}</li>
            <li>key: {activity.key}</li>
            <li>accessibility: {activity.accessibility}</li>
          </ul>
        </>
      }
    </div>
	));

  // console.log(fetchedObjects)

  const generateItems = fetchedObjects.map((activity) => (
    <div key={activity.key}>
      <li>{activity.activity}</li>	
      <button onClick={() => handleExpand(activity.key)}>
        {expanded[activity.key] ? 'Collapse' : 'Expand'}
      </button>
      {expanded[activity.key] && 
        <>
          <ul>
            <li>type: {activity.type}</li>
            <li>participants: {activity.participants}</li>
            <li>price: {activity.price}</li>
            <li>link: {activity.link}</li>
            <li>key: {activity.key}</li>
            <li>accessibility: {activity.accessibility}</li>
          </ul>
        </>
      }
    </div>
  ))

	return (
		<div className='App'>
			<br />
			<button onClick={handleGenerate} style={{fontSize: '20px'}}>Generate Activity</button>
			<div style={{display: 'inline', float: 'left'}}>
				<ul>
					<li>
						{listItems}
					</li>
					<li>
						{generateItems}
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
