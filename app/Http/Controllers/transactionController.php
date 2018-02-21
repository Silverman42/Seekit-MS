<?php

namespace seekit\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;
use Mavinoo\UpdateBatch\UpdateBatchFacade;
use Mavinoo\UpdateBatch\UpdateBatch;

class transactionController extends Controller
{
    public function __construct(){
        $this->middleware('auth');
    } 
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $getAllTransaction = \seekit\transaction::orderBy('created_at','desc')->paginate(10);
        return view('transaction.index')->with('queriedTransaction',$getAllTransaction);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        return view('transaction.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $transactResult = $request->json()->all();
        $count = 0;
        $entities = [];
        foreach ($transactResult as $key => $value) {
            $entities[$count] = $value;
            $count++;
        }
        $total = $entities[0]['total'];
        $transaction_name = $entities[0]['transaction_id'];
        $totalProfit = $entities[0]['totalProfit'];
        $totalLoss = $entities[0]['totalLoss'];
        $input_params = $entities[1];
        $prod_update = [];
      $queryDB =  DB::transaction(function() use ($total,$transaction_name,$input_params,$prod_update,$totalProfit,$totalLoss){
        try{
            $getTransactionId = DB::table('transaction')->insertGetId([
                'transaction_name'=> $transaction_name,
                'total_price'=> $total,
                'total_profit'=>$totalProfit,
                'total_loss' => $totalLoss,
                'created_at'=> Carbon::now(),
                'updated_at'=> Carbon::now()]);
            for($i=0; $i<count($input_params); $i++){
                $input_params[$i]['transaction_id'] = $getTransactionId;
                $input_params[$i]['updated_at'] = Carbon::now();
                $input_params[$i]['created_at'] = Carbon::now();
                $prod_update[$i]['id'] = $input_params[$i]['product_restock_id'];
                $prod_update[$i]['quantity'] = $input_params[$i]['product_quantity'];
                $prod_update[$i]['updated_at'] = Carbon::now();
            };
            $createTransactDesc = DB::table('transaction_description')->insert($input_params);
            $updateProdData = new UpdateBatch;
            $updateProdData->updateBatch('product_restock',$prod_update,'id');
        }
        catch(PDOException $e){
            return response()->json(['error'=>$e->getMessage()],409);
        }    
        
       });
       //return json_encode($prod_update); //json_encode($entities[0]); 
       $data = "Transaction Successful";
       return response()->json(['redirect'=>url()->to('/transaction')],201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $transaction_desc = \seekit\transact_desc::with(['product'=>function($q){ $q->select(['id','productName']);},'product_restock'=>function($q){ $q->select(['id','batch_id','Vendor']);}])
        ->where('transaction_id',$id)->get(['product_id','product_restock_id','product_quantity','product_quantity_pur','product_price']);
        return response()->json($transaction_desc);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
