class Statistics{
    constructor(values, length){
        this.values = values;
        this.length = values.length;
    }

    // Sorting the array
    arrSort(val){
        val = this.values
        return val.sort((a, b) => a - b)
    }

    //Finding Mean which is the average (sum of the numbers divided by the number of numbers)
    mean(val, length){
        val = this.values
        length = this.length
        let sum = 0;
        for(let i = 0; i < length; i++){
            sum+= val[i];
        }
        const answer = sum / length;
        return answer;
    }

    // Finding Median which is the middle number when the values are sorted in either ascending or descending order
    median(val, length){
        val = this.values
        length = this.length
        // Sorting the array in ascending order
        const arr = this.arrSort(val)
        if((length % 2) == 0){
            const pos = length / 2;
            let answer = (val[pos] + val[pos - 1]) / 2
            return answer;
        }else{
            const pos = (length - 1) / 2
            return val[pos];
        }
    }

    // Mode which is the value with the highest occurence
    mode(vals, length){
        vals = this.values
        const val = vals
        length = this.length
        let maxVal = -Infinity;
        val.forEach(function(val, index){
            let countVal = vals.filter(value => value === val).length;
            if(countVal > maxVal){
                maxVal = val;
            }
        })
        console.log(maxVal);
    }

    // Finding Range which is the difference between the smallest and the biggest number
    range(val, length){
        val = this.values
        length = this.length
        const max = Math.max(val);
        const min = Math.min(val);

        return max - min;
    }

    // Finding Variance which is the average of the square of the difference between each value and the mean
    variance(val, length){
        val = this.values
        length = this.length
        //Finding the mean
        const mean = this.mean(val, length)
        let diff = 0
        for(let i = 0; i < length; i++){
            diff += (val[i] - mean)**2;
        }
        const answer = diff / length
        return answer;
    }
        
    // Finding Standard Deviation which is the squaretoot of variance
    standardDeviation(val, length){
        val = this.values
        length = this.length
        const variance = this.variance(val, length)
        return Math.sqrt(variance)
    }


    // Mean Absolute deviation is average of the absolute difference between each value and the mean
    meanAbDeviation(val, length){
        val = this.values
        length = this.length;
        const mean = this.mean(val, length)
        let meanDev = 0;
        for(let i = 0; i < length; i++){
            meanDev += Math.abs(val[i] - mean);
        }
        const answer = meanDev / length
        console.log(answer)
    }

    // Finding Interquartile Range (IQR): which is the difference between the 1st quartile (Q1) and the 3 quartile (Q3)
    iqr(val, length){
        val = this.values
        length = this.length;

        const q1 = val[Math.floor(length * 0.25)]; 
        const q3 = val[Math.floor(length * 0.75)]; 
        
        return q3 - q1;
    }
        
}

values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const val = new Statistics(values)
val.mode();
// const median
// const mean