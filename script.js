var map = document.getElementById('field');
var context = map.getContext('2d');
document.addEventListener('mousemove', mouse);
var reset = document.getElementById('reset');
map.width = 500; //250  
map.height = 700; //450 255

var pScore = 0;
var cScore = 0;

var ps = 10;
var xs = 0;
var ys = 0;

var difficulty = true;
var random = 1;
var speed;

var bounceSFX = new Audio();
bounceSFX.src = 'ball.mp3';

var goalSFX = new Audio();
goalSFX.src = 'goal.wav';

var clickSFX = new Audio();
clickSFX.src = 'click.wav';

var puck = {
    x : 250,
    y : 350,
    r : 20,
    sA : 0,
    eA : Math.PI*2,
    c  : "grey",
    c2 : "orange",
    lw : 3
};

var player = {
    x : 250,
    y : 650,
    r : 25,
    sA : 0,
    eA : Math.PI*2,
    c  : "grey",
    c2 : "#2200ff",
    lw : 3
};

var computer = {
    x : 250,
    y : 50,
    r : 25,
    sA : 0,
    eA : Math.PI*2,
    c  : "grey",
    c2 : "purple",
    lw : 3
};



main();

function main()
{
    setInterval(update, 10);
}

function update() 
{
    background();
    drawCircle(puck.x, puck.y, puck.r, puck.sA, puck.eA, puck.c, puck.c2, puck.lw);
    drawCircle(player.x, player.y, player.r, player.sA, player.eA, player.c, player.c2, player.lw);
    drawCircle(computer.x, computer.y, computer.r, computer.sA, computer.eA, computer.c, computer.c2, computer.lw);
    logic();
}

function background()
{
   context.fillStyle = "black";
   context.fillRect(0, 0, map.width, map.height);
   drawLines(0, 350, 500, 350, "grey", 3);
   drawLines(0, 350, 0, 0, "purple", 6);
   drawLines(0, 0, 200, 0, "purple", 6);
   drawLines(500, 350, 500, 0, "crimson", 6);
   drawLines(300, 0, 500, 0, "crimson", 6);
   drawLines(500, 700, 500, 350, "#2200ff", 6);
   drawLines(300, 700, 500, 700, "#2200ff", 6);
   drawLines(0, 350, 0, 700, "orange", 6);
   drawLines(0, 700, 200, 700, "orange", 6);

   drawCircle(250, 350, 50, 0,Math.PI*2 ,"grey", 0, 3);
   drawCircle(250, 5, 50, 0,Math.PI*2 ,"grey", 0, 3);
   drawCircle(250, 695, 50, 0,Math.PI*2 ,"grey", 0, 3);

   drawRectangle(200, -25, 100, 30, "white",4);
   drawRectangle(200, 695, 100, 30, "white",4);

   drawScore(pScore, 450, 410, "white");
   drawScore(cScore, 450, 330, "white");
}

function drawLines(x, y, xt, yt, color, lwidth)
{
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(xt, yt);
    context.strokeStyle = color;
    context.lineWidth = lwidth;
    context.stroke();
    context.closePath();
}

function drawCircle(x, y, radius, sAngle, eAngle, color, color2, lwidth)
{
    context.beginPath();
    context.arc(x, y, radius, sAngle, eAngle);
    context.strokeStyle = color;
    context.fillStyle = color2;
    context.lineWidth = lwidth;
    context.stroke();
    context.fill()
    context.closePath();

}

function drawRectangle(x, y, w, h, color, lwidth)
{
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = lwidth;
    context.strokeRect(x, y, w, h);
    context.closePath();
}
function drawScore(text, x, y, color)
{
    context.font = "50px Fantasy"
    context.strokeStyle = color;
    context.strokeText(text, x, y);
}

function mouse(event)
{
    var mouse_x = event.clientX - (map.offsetLeft - (map.width/2));
    var mouse_y = event.clientY - (map.offsetTop - (map.height/2));

    if(mouse_x > 30 && mouse_x < map.width - 30)
    {
        player.x = mouse_x;
    }
    if(mouse_y > 375 && mouse_y < map.height - 30)
    {
        player.y = mouse_y;
    }
}

function caculativeDistance(mX, mY, pX, pY)
{

    var tx = Math.pow((pX - mX), 2);
    var ty = Math.pow((pY - mY), 2);
    var temp = Math.sqrt(tx+ty);
    return temp;
}

function logic() 
{  
    reset.onclick = function()
    {
        clickSFX.play();
        player.x = 250;
        player.y = 650;
        computer.x = 250;
        computer.y = 50;
        puck.x  = 250;
        puck.y  = 350;
        xs = 0;
        ys = 0;
        pScore = 0;
        cScore = 0;
    }

    if((puck.x + xs) < (puck.r + 10))   //left
    {
        xs *=-1;
    }
    if((puck.x + xs) > (map.width - puck.r - 10))
    {
        xs *=-1;
    }
        // Goal Logic

        if(puck.x > 200 && puck.x<300)
        {
            
            if((puck.y + ys) > (map.height - puck.r -10))
            {
                goalSFX.play();
                puck.x = map.width/2;
                puck.y = map.height/2;
                cScore += 1;
                xs = 0;
                ys = 0;
            }
    
            else if((puck.y +ys) < (puck.r + 10))
            {
                goalSFX.play();
                puck.x = map.width/2;
                puck.y = map.height/2;
                pScore += 1;
                xs = 0;
                ys = 0;
            }
        }

    else if((puck.y +ys) <= (puck.r + 10))
    {
        ys *=-1;
    }
    else if((puck.y + ys) >= (map.height - puck.r - 10))
    {
        ys *=-1;
    }

    if((Math.abs(xs)+Math.abs(ys)) < 10 && puck.y <= map.height/2)
    {
        if(puck.y - 20 > computer.y)
        {
            computer.y += 1.5;
        }
        else if(puck.y +20 < computer.y)
        {
            computer.y -= 1.5;
        }
    }
    else if (computer.y < 50)
    {
        computer.y +=2;
    }

    else if(computer.y > 50)
    {
        computer.y -=2;
    }

    // border 

    if(computer.x < 10)//left
    {
        computer.x = 10+25;
    }

    if(computer.x > 490)
    {
        computer.x = 500 -10 -25;
    }

    if(computer.y < 10)
    {
        computer.y = 10+25;
    }
    if(computer.y > 690)
    {
        computer.y = 700 -10 -25;
    }

    if(difficulty == true)
    {
        random = 50;
    }

    if(difficulty == false)
    {
        speed = 1;
    }

    else //<<-- Difficulty == True
    {
        speed = 4;
    }

    if(puck.y < computer.y && puck.x > computer.x +25 && puck.x < computer.x -25)
    {
        speed = -2;
    }

    if(computer.x < puck.x -20)
    {
        computer.x += speed;
    }

    if(computer.x > puck.x +20 - random)
    {
        computer.x -= speed;
    }

    var computerDistance = caculativeDistance(computer.x, computer.y, puck.x, puck.y);
    var playerDistance = caculativeDistance(player.x, player.y, puck.x, puck. y);

    if(computerDistance < 45)
    {
        bounceSFX.play();
        var compTempx = puck.x - computer.x;
        var compTempy = puck.y - computer.y;
        compTempx/=45;
        compTempy/=45
        xs = compTempx*ps;
        ys = compTempy*ps;
    }
    if(playerDistance < 45)
    {
        bounceSFX.play();
        var playTempx = puck.x - player.x;
        var playTempy = puck.y - player.y;
        playTempx/=45;
        playTempy/=45
        xs = playTempx*ps;
        ys = playTempy*ps;
    }

    puck.x += xs;
    puck.y += ys;

    xs *= 0.99;
    ys *= 0.99;
}