<?php
session_start();

$_SESSION['digital_walks'] = false;

require(__DIR__ . '/../../../php/includes/connection.inc.php');

$query = "DELETE FROM password_resets WHERE token = ?";
if ($stmt = $connection->prepare($query)) {
	$stmt->bind_param("s", $_SESSION['token']);
	$stmt->execute();
	$stmt->close();
}
unset($_SESSION['token']);

if (!isset($_SESSION['csrf_token'])) {
	$_SESSION['csrf_token'] = bin2hex(random_bytes(32));
}

if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
	header('Location: ../index.php');
	exit;
}

$_SESSION['index'] = false;
$_SESSION['sign_in_page'] = false;

require_once(__DIR__ . '/../components/header.inc.php');
require_once(__DIR__ . '/../components/nav.inc.php');
?>

<main id="main-content" role="main">
	<section class="auth__container col-2" aria-labelledby="login-heading">
		<!-- Form -->
		<div class="login-form-container">
			<form id="loginfrm"
				action="../../../php/login.inc.php"
				method="POST"
				novalidate
				aria-labelledby="form-heading">

				<h2 id="form-heading" class="visually-hidden">Login</h2>
				<!-- <p>Sign in to access immersive trails, stunning landscapes, and a walking experience designed for clarity and wellbeing.</p> -->

				<?php if (isset($_GET['password']) && $_GET['password'] === "success"): ?>
					<p class="success" role="alert">Your password has been successfully updated!</p>
				<?php endif; ?>

				<?php if (isset($_GET['account_deleted']) && $_GET['account_deleted'] === "1"): ?>
					<p class="success" role="alert">Your account has been successfully deleted. Thank you for using our service.</p>
				<?php endif; ?>

				<?php if (isset($_SESSION['errors'])): ?>
					<?php if (isset($_SESSION['errors']['login'])): ?>
						<p class="error" role="alert"><?php echo htmlspecialchars($_SESSION['errors']['login'], ENT_QUOTES, 'UTF-8'); ?></p>
					<?php endif; ?>
					<?php unset($_SESSION['errors']); ?>
				<?php endif; ?>

				<?php if (isset($_SESSION['errors']['email'])): ?>
					<p class="error" role="alert"><?php echo htmlspecialchars($_SESSION['errors']['email'], ENT_QUOTES, 'UTF-8'); ?></p>
				<?php endif; ?>
				<?php if (isset($_SESSION['errors']['password'])): ?>
					<p class="error" role="alert"><?php echo htmlspecialchars($_SESSION['errors']['password'], ENT_QUOTES, 'UTF-8'); ?></p>
				<?php endif; ?>
				<?php unset($_SESSION['errors']); ?>

				<!-- CSRF Token -->
				<input type="hidden"
					name="csrf_token"
					value="<?php echo htmlspecialchars($_SESSION['csrf_token'], ENT_QUOTES, 'UTF-8'); ?>">
				<!-- Email Address -->
				<div class="form-group">
					<label for="email">Email Address</label>
					<input type="email"
						name="email"
						id="email"
						autocomplete="email"
						placeholder="Enter your email address"
						required
						aria-required="true"
						value="<?php echo isset($_SESSION['form_data']['email']) ? htmlspecialchars($_SESSION['form_data']['email'], ENT_QUOTES, 'UTF-8') : ''; ?>">
				</div>
				<!-- Password -->
				<div class="form-group">
					<label for="password">Your Password</label>
					<div class="password__container">
						<input type="password"
							name="password"
							id="password"
							autocomplete="current-password"
							placeholder="Enter your password"
							required
							aria-required="true">
						<button type="button"
							class="show_password"
							tabindex="-1"
							aria-label="Toggle password visibility">
							<i class="fa-solid fa-eye-low-vision" aria-hidden="true"></i>
						</button>
					</div>
				</div>
				<div class="form-group">
					<a href="../pages/reset-password.php" class="forgot-password">Forgot Password?</a>
				</div>
				<!-- Buttons -->
				<div class="button__container">
					<button type="submit" class="button">Login</button>
					<a href="../pages/signup.php" class="button" role="button">Sign up</a>
				</div>
			</form>
		</div>
	</section>
</main>

<?php require_once(__DIR__ . '/../components/footer.inc.php'); ?>