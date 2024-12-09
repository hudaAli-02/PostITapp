const fruits=[];
fruits.push("Banana ","Mango ","Orange ");
const num =[23,45,67,89];
const result= num.filter((num)=>num>50);
function Array()
{
    return(
        <div>
            <h1>
                Array 
            </h1>
            {fruits}<br></br>
            {result}<br></br>
            {num.unshift(3,10)}<br></br>
        </div>

    );

}
export default Array;