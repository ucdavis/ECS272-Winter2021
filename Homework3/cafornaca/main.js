// Global data
var bodyStyleCount = {};
var primaryEggGroup = {};
  
// Load the dataset from a CSV URL
d3.csv('https://raw.githubusercontent.com/cafornaca/ECS272-Winter2021/main/Homework3/cafornaca/pokemon_alopez247.csv')
  .then(csv => {
      // Log CSV in browser console
      console.log(csv);

      /* KEYS ==========================================
      Number,Name,Type_1,Type_2,Total,HP,Attack,Defense,
      Sp_Atk,Sp_Def,Speed,Generation,isLegendary,Color,
      hasGender,Pr_Male,Egg_Group_1,Egg_Group_2,hasMegaEvolution,
      Height_m,Weight_kg,Catch_Rate,Body_Style
      */

      // create data by selecting two columns from csv 
      var data = csv.map(row => {

        //Count body styles
       bodyStyleCount[String(row['Body_Style'])] = bodyStyleCount[String(row['Body_Style'])] ? bodyStyleCount[String(row['Body_Style'])] + 1.0 : 1.0;

       // Count Egg groups
       primaryEggGroup[String(row['Egg_Group_1'])] = primaryEggGroup[String(row['Egg_Group_1'])] ? primaryEggGroup[String(row['Egg_Group_1'])] + 1.0 : 1.0;


          return {
              Number: Number(row['Number']),
              Name: String(row['Name']),
              Type_1: String(row['Type_1']),
              Type_2: String(row['Type_2']),
              Total: Number(row['Total']),
              HP: Number(row['HP']),
              Attack: Number(row['Attack']),
              Defense: Number(row['Defense']),
              Sp_Atk: Number(row['Sp_Atk']),
              Sp_Def: Number(row['Sp_Def']),
              Speed: Number(row['Speed']),
              Generation: Number(row['Generation']),
              isLegendary: String(row['isLegendary']),
              Color: String(row['Color']),
              hasGender: String(row['hasGender']),
              Pr_Male: Number(row['Pr_Male']),
              Egg_Group_1: String(row['Egg_Group_1']),
              Egg_Group_2: String(row['Egg_Group_2']),
              hasMegaEvolution: String(row['hasMegaEvolution']),
              Height_m: Number(row['Height_m']),
              Weight_kg: Number(row['Weight_kg']),
              Catch_Rate: Number(row['Catch_Rate']),
              Body_Style: String(row['Body_Style'])
          }
      })
  }
);


// View data
console.log("bodyStyleCount: ", bodyStyleCount);
console.log("primaryEggGroup: ", primaryEggGroup);


var data1 = {bipedal_tailed: 158, bipedal_tailless: 109, four_wings: 18, head_arms: 39, head_base: 30, 
    head_legs: 17, head_only: 34, insectoid: 30, multiple_bodies: 15, quadruped: 135, serpentine_body: 29,
    several_limbs: 13, two_wings: 63, with_fins: 31};

var data2 = {Amorphous: 41, Bug: 66, Ditto: 1, Dragon: 10, Fairy: 30, Field: 169, Flying: 44, Grass: 27,
    HumanLike: 37, Mineral: 46, Monster: 74, Undiscovered: 73, Water_1: 74, Water_2: 15, Water_3: 14};
