



//GET /api/ user
export const getUserData = async (req,res)=>{
    try {
        const role = req.user.role;
        const recentSearchesCities = req.user.recentSearchesCities;
        res.json({success: true, role, recentSearchesCities})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

//Store User Recent Searched Cities
//res:request, res : respond, res.body: request body
export const storeRecentSearchedCities = async(req,res)=>{
    try {
        const {recentSearchedCity} = req.body;
        const user = await req.user;

        if(user.recentSearchesCities.length < 3){
            user.recentSearchesCities.push(recentSearchedCity)
        }else{
            user.recentSearchesCities.shift();
            user.recentSearchesCities.push(recentSearchedCity)
        }
        await user.save();
        res.json({success: true, message:"City added"})
        
    } catch (error) {
        res.json({success: false, message: error.message})
        
    }
};