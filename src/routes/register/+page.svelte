<div class="authContainer">
	<main>
		<h1>Register</h1>
		<form action="?/register" method="post">
			<label for="name">
				<input type="text" name="name" id="name" placeholder="Enter your name" />
			</label>
			<label for="email">
				<input type="email" name="email" id="email" placeholder="Enter your email" />
			</label>
			<label for="password">
				<input type="password" name="password" id="password" placeholder="Enter your password" />
			</label>
			<label for="passwordConfirm">
				<input
					type="password"
					name="passwordConfirm"
					id="passwordConfirm"
					placeholder="Confirm your password"
				/>
			</label>
			<!-- <select name="role" id="role">
				<option value="student">Student</option>
				<option value="teacher">Teacher</option>
			</select> -->
			<div class="radios">
				<label for="student">
					<input type="radio" name="role" id="student" value="student" checked/>
					Student
				</label>
				<label for="teacher">
					<input type="radio" name="role" id="teacher" value="teacher" />
					Teacher
				</label>
			</div>
			<button type="submit">Submit</button>
		</form>
	</main>
</div>

<style>
	.authContainer {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		flex: 1;
		align-items: center;
		height: 100vh;
	}
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		/* border: 1px solid black; */
		border: none;
		padding: 10px;
		border-radius: 1em;
		/* width: 70vw; */
		padding-inline: 7rem;
		padding-block: 2rem;
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
	}
	main h1 {
		font-size: 2.5rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		gap: 1rem;
		margin-bottom: 30px;
	}
	form button {
		width: 100%;
		font-size: 1.2rem;
		padding: 1rem;
		border-radius: 5px;
		border: none;
		box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
		transition-duration: 250ms;
		color: white;
		background-color: black;
	}
	form button:hover {
		cursor: pointer;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
		color: black;
		background-color: white;
	}
	form label {
		padding: 5px;
		border: 1px solid black;
		border-radius: 5px;
	}
	form label input {
		width: 100%;
		border: none;
		font-size: 1.3rem;
	}

	form label input:focus {
		outline: none;
	}
	.radios {
		display: flex;
		justify-content: space-around;
		width: 100%;
	}
	.radios label {
		display: flex;
		padding: 1em;
		cursor: pointer;
	}
</style>
