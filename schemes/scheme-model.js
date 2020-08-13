const db = require('./db.config');
const { where } = require('./db.config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
    update,
    remove
}

function find(){
    return db('schemes')
}
function findById (id){
    let query = db('schemes');
    if(id){
        return query
            .where({id})
            .first()
    }
}

function findSteps(id){
    let query = db('steps');
    if(id) {
        query
        .join('schemes')
        .where('schemes.id', id)
        .first();  
        const promise = [query, getSchemeStep(id)];
        return Promise.all(promise)
            .then( results => {
                const [schemes, steps] = results;
                if (schemes){
                    schemes.steps = steps;
                    return schemeTobody(schemes);
                }else{
                    return null;
                }
            });
        
    }else{
        return query.then(scheme=> {
            return scheme.map(schem => schemeTobody(schem));
        })
    }
}

function add(scheme){
    return db('schemes')
        .insert(scheme, 'id')
        .then(([id]) => findById(id))
}
function addStep(step){
    return db('steps')
        .insert(step,'id')
        // .then(([id]) => findById(id))
}

function update(changes, id){
    return db('schemes')
        .where({id})
        .update(changes)
        .then(count => count > 0 ? findById(id) : null);
}
function remove(id){
   
    return db('schemes')
        .where('id', id)
        .del();
           
}

function getSchemeStep(schemId){
    return db('steps')
        .where('step_number', schemId)
        .then(steps => steps.map(step => stepSche(step)));
}

// middleware mapper function
function schemeTobody (sche){
    const result = {
        ...sche,
    }
    if(sche.steps){
        result.steps = sche.steps.map(step=> ({
            ...step
        }))
    }
    return result;
}

function stepSche (steps){
   return{
       ...steps,
   }
}

