bean_bag_image = "";
status = "";
objects = [];

function preload()
{
    bean_bag_image = loadImage("beanbag.jpg");
}

function setup()
{
    canvas = createCanvas(640,420);
    canvas.center();
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : detecting objects";
}

function modelLoaded()
{
    console.log("Model is Loaded");
    status = true;
    objectDetector.detect(bean_bag_image,gotResults);
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw()
{
    image(bean_bag_image,0,0,640,420);

    if(status != "")
    {
        for(i = 0; i < objects.length; i++)
        {
           document.getElementById("status").innerHTML = "Status : Object Dectected";
           fill("red");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + "" + percent + "%" ,objects[i].x , objects[i].y);
           noFill();
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}