document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("animationCanvas");
    const context = canvas.getContext("2d");

    let centerX = 200;
    let centerY = 200;
    let radius = 10;
    let angle = 0;

    // Array to store points of the trajectory
    const trajectoryPoints = [];
    const maxTrajectoryLength = 70;

    // Variables for the revolving red dot
    let revolvingX;
    let revolvingY;
    let revolvingRadius = 30; // Adjust the radius of the red dot's orbit
    let revolvingAngle = 0;
    let revolvingSpeed = 0.25; // Adjust the speed of the red dot's revolution (increased speed)

    function updatePosition() {
        angle += 0.1;
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        centerX = x;
        centerY = y;

        // Add the current point to the trajectory
        trajectoryPoints.push({ x: centerX, y: centerY });

        // Limit the length of the trajectory
        if (trajectoryPoints.length > maxTrajectoryLength) {
            trajectoryPoints.shift(); // Remove the oldest point
        }

        // Update position of the revolving red dot
        revolvingX = centerX + revolvingRadius * Math.cos(revolvingAngle);
        revolvingY = centerY + revolvingRadius * Math.sin(revolvingAngle);
        revolvingAngle += revolvingSpeed;
    }

    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        // Draw the trajectory path
        context.strokeStyle = "#2ecc71"; // Green color
        context.lineWidth = 2;
        context.lineJoin = "round";
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(trajectoryPoints[0].x, trajectoryPoints[0].y);

        for (let i = 1; i < trajectoryPoints.length; i++) {
            context.lineTo(trajectoryPoints[i].x, trajectoryPoints[i].y);
        }

        context.stroke();

        // Draw the blue dot
        context.fillStyle = "#3498db"; // Blue color
        context.beginPath();
        context.arc(centerX, centerY, 5, 0, 2 * Math.PI);
        context.fill();

        // Draw the red dot
        context.fillStyle = "#e74c3c"; // Red color
        context.beginPath();
        context.arc(revolvingX, revolvingY, 3, 0, 2 * Math.PI);
        context.fill();

        // Draw line connecting red dot to its center
        context.strokeStyle = "#3498db"; // Blue color
        context.beginPath();
        context.moveTo(centerX, centerY);
        context.lineTo(revolvingX, revolvingY);
        context.stroke();

        // Draw line connecting blue dot to its center
       context.strokeStyle = "#e74c3c"; // Red color
        context.beginPath();
        context.moveTo(centerX , centerY );
        context.lineTo(200,300);
       context.stroke();
       
       // Draw horizontal line attached to the red dot
        context.strokeStyle = "#e74c3c"; // Red color
        context.beginPath();
        context.moveTo(revolvingX, revolvingY);
        context.lineTo(revolvingX+100, revolvingY); // Adjust the length of the line
        context.stroke();
        

        requestAnimationFrame(draw);
    }

    function animate() {
        updatePosition();
        draw();
        setTimeout(animate, 50);
    }

    canvas.width = 400;
    canvas.height = 600;
    animate();
});
