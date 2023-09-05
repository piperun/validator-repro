<script lang="ts">
	function verify() {
		const folderData = {
			title: 'My Folder',
			description: 'This is a test folder',
			tags: ['tag', 'tag'],
			access: 'PRIVATE',
			type: 'link'
		};

		// Fetch data
		fetch('/api/folder', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(folderData)
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error('Network response was not ok');
				}
				return response.json();
			})
			.then((data) => {
				console.log('Data received:', data);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}
</script>

<button on:click={verify}>Send for validation</button>
