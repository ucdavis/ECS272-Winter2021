export function data_cleaning(dataset,columns){
        let updated_dataset = [];
        for(let i = 0;i<dataset.length;i++){
          let appendable = true;
          for(let j=0;j<columns.length;j++){
            if(!dataset[i][columns[j]]){
              appendable = false;
              break;
            }
          }
          if(appendable){
            updated_dataset.push(dataset[i]);
          }
        }
        return updated_dataset;
      }

export function data_processing(dataset,columns){
        let new_dataset = JSON.parse(JSON.stringify(dataset));
        for(let i = 0;i < new_dataset.length; i++){
          for(const property in new_dataset[i]){
            if(!columns.includes(property)){
              delete new_dataset[i][property]
            }
          }
        }
        return new_dataset;      
      }

